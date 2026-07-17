/**
 * CONTRACT — implemented by the Lead_Backend worker; consumed by listing,
 * project, developer and agent pages.
 * Do NOT change the exported signature — internals only.
 */
export interface LeadFormProps {
  targetType: 'listing' | 'project' | 'developer' | 'agent'
  targetId: string
  /** Displayed as the form heading context, e.g. agent or developer name. */
  recipientName?: string
  className?: string
}

// ponytail: placeholder so parallel workers typecheck before the real form lands
export function LeadForm(_props: LeadFormProps) {
  return null
}
