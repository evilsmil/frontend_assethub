type DetailItemProps = {
  label: string
  value: string
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}