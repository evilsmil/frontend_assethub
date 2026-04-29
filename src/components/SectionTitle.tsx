type SectionTitleProps = {
  index?: string
  label: string
  title: string
  description?: string
  variant?: 'default' | 'glassCenter' | 'sectorCompact'
}

export function SectionTitle({
  index,
  label,
  title,
  description,
  variant = 'default',
}: SectionTitleProps) {
  const isGlassCenter = variant === 'glassCenter'
  const isSectorCompact = variant === 'sectorCompact'

  return (
    <header
      className={`content-wrap section-heading section-title-row${description ? '' : ' compact'}${isGlassCenter ? ' glass-center' : ''}${isSectorCompact ? ' sector-compact' : ''}`}
    >
      {index ? (
        <div className="section-title-mark" aria-hidden="true">
          <span>{index}</span>
        </div>
      ) : null}
      <div className="section-title-copy">
        <span className="section-title-label">{label}</span>
        <h2>{title}</h2>
        {isGlassCenter && description ? <p>{description}</p> : null}
      </div>
      {!isGlassCenter && description ? <p>{description}</p> : null}
    </header>
  )
}