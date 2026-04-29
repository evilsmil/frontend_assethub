import type { LucideIcon } from 'lucide-react'

type StatBlockProps = {
  icon: LucideIcon
  label: string
  value: string
}

export function StatBlock({ icon: Icon, label, value }: StatBlockProps) {
  return (
    <div className="stat-block">
      <Icon size={21} />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}