import { auth } from "@/auth"
import { LISTINGS } from "@/data/listings"
import { db } from "@/lib/db"
import { checkRateLimit } from "@/lib/inquiries/rate-limit"
import { hasHoneypot, validateInquiry } from "@/lib/inquiries/validate"

/** Static-listing dealType → Inquiry.deal vocabulary. */
const DEAL_MAP = { sale: "buy", rent: "rent", daily: "daily" } as const

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  )
}

export async function POST(req: Request) {
  const limit = checkRateLimit(clientIp(req))
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 })
  }

  // Honeypot: bots get a convincing success, nothing touches the DB.
  if (hasHoneypot(body)) return Response.json({ ok: true })

  const parsed = validateInquiry(body)
  if (!parsed.ok) {
    return Response.json({ ok: false, error: "validation", fields: parsed.fields }, { status: 400 })
  }
  const { targetType, targetId, name, phone, message } = parsed.data

  // Session is optional — an auth hiccup must never lose a lead.
  const session = await auth().catch(() => null)

  // Enrich known static listings (agent + geo) so the CRM row is self-contained.
  const listing = targetType === "listing" ? LISTINGS.find((l) => l.id === targetId) : undefined

  try {
    await db.inquiry.create({
      data: {
        id: crypto.randomUUID(),
        // ponytail: the Inquiry model has no targetType column — non-listing
        // targets are prefixed (`developer:acme`) so listingId stays clean for
        // the dominant listing case. Upgrade path: add targetType/targetId
        // columns via migration and split the prefix here.
        listingId: targetType === "listing" ? targetId : `${targetType}:${targetId}`,
        agentName: listing?.agent.name ?? "Sivrce",
        agentPhone: listing?.agent.phone ?? null,
        buyerName: name,
        // ponytail: Inquiry.buyerEmail is required but the form collects no
        // email — use the session email when present, else a synthetic
        // phone-derived placeholder. Upgrade path: nullable buyerEmail column.
        buyerEmail: session?.user?.email ?? `lead+${phone.replace(/\D/g, "")}@sivrce.ge`,
        buyerPhone: phone,
        message,
        deal: listing ? DEAL_MAP[listing.dealType] : "buy",
        city: listing?.city ?? "",
        district: listing?.district ?? "",
        price: listing?.priceGEL ?? 0,
      },
    })
  } catch (error) {
    console.error("[api/inquiries] create failed", error)
    return Response.json({ ok: false, error: "server" }, { status: 500 })
  }

  return Response.json({ ok: true })
}
