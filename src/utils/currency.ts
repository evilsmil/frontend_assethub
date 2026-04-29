export function formatCurrency(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`
}

export function compactCurrency(value: number) {
  if (value >= 1000000) {
    return `${Math.round(value / 1000000)}M FCFA`
  }

  return formatCurrency(value)
}