import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { type NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

import { db } from "@/lib/db"

const providers: NextAuthConfig["providers"] = []

// Google is enabled only when its credentials are configured, so a missing
// OAuth config can never crash boot or local development.
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // Google guarantees email ownership on the ID token, so linking an
      // existing account with the same verified email is safe. Any future
      // provider that does NOT verify email must not set this.
      allowDangerousEmailAccountLinking: true,
    }),
  )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers,
  // Database sessions via the Prisma adapter (Session model in schema).
  session: { strategy: "database" },
})
