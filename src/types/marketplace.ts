import type { FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'

export type Page = 'home' | 'catalog' | 'seller' | 'how' | 'about' | 'admin'
export type Sector = 'Énergie' | 'BTP' | 'Transport' | 'Agriculture' | 'IT' | 'Hôtellerie'
export type SectorFilter = Sector | 'all'
export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'recent'
export type ViewMode = 'grid' | 'list'
export type Audience = 'seller' | 'buyer'

export type Asset = {
  id: number
  name: string
  sector: Sector
  price: number
  location: string
  year: number
  condition: 'Très bon état' | 'Bon état' | 'État correct'
  brand: string
  usage: string
  seller: string
  description: string
  image: string
  accent: string
  urgent: boolean
  certified: boolean
  tags: string[]
}

export type AssetPayload = Omit<Asset, 'id'>

export type NavItem = {
  page: Page
  label: string
}

export type SectorOption = {
  key: SectorFilter
  label: string
  icon: LucideIcon
}

export type ProcessStep = {
  title: string
  detail: string
  icon: LucideIcon
}

export type FormSubmitHandler = (event: FormEvent<HTMLFormElement>) => void