import type { Asset } from '../types/marketplace'

export function getConditionClass(condition: Asset['condition']) {
  if (condition === 'Très bon état') return 'condition excellent'
  if (condition === 'Bon état') return 'condition good'
  return 'condition fair'
}