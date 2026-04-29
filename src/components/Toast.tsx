import { Check } from 'lucide-react'

type ToastProps = {
  message: string
}

export function Toast({ message }: ToastProps) {
  return (
    <div className={`toast ${message ? 'show' : ''}`} role="status" aria-live="polite">
      <Check size={16} />
      <span>{message}</span>
    </div>
  )
}