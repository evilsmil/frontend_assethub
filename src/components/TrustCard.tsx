import type { LucideIcon } from 'lucide-react'

type TrustCardProps = {
  icon: LucideIcon
  text: string
  title: string
}

export function TrustCard({ icon: Icon, text, title }: TrustCardProps) {
  return (
    <article className="trust-card">
      <Icon size={23} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}