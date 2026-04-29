import { assets as seedAssets } from '../data/marketplace'
import type { Asset, AssetPayload, Sector } from '../types/marketplace'

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000/api'
const STORAGE_MODE = (import.meta.env.VITE_STORAGE_MODE as string | undefined)?.toLowerCase()

export const usesLocalStorage = STORAGE_MODE !== 'api'

const ASSETS_KEY = 'assethub.assets.v1'
const OFFERS_KEY = 'assethub.offers.v1'
const SELLER_SUBMISSIONS_KEY = 'assethub.sellerSubmissions.v1'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    let message = `Erreur ${response.status}`
    try {
      const body = (await response.json()) as { message?: string | string[] }
      if (body?.message) {
        message = Array.isArray(body.message) ? body.message.join(', ') : body.message
      }
    } catch {
      /* corps non JSON */
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export type AssetListParams = {
  sector?: string
  q?: string
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'recent'
}

export function fetchAssets(params: AssetListParams = {}): Promise<Asset[]> {
  if (usesLocalStorage) return fetchLocalAssets(params)

  const search = new URLSearchParams()
  if (params.sector && params.sector !== 'all') search.set('sector', params.sector)
  if (params.q) search.set('q', params.q)
  if (params.sort) search.set('sort', params.sort)
  const query = search.toString()
  return request<Asset[]>(`/assets${query ? `?${query}` : ''}`)
}

export function createAsset(payload: AssetPayload): Promise<Asset> {
  if (usesLocalStorage) return createLocalAsset(payload)

  return request<Asset>('/assets', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateAsset(assetId: number, payload: AssetPayload): Promise<Asset> {
  if (usesLocalStorage) return updateLocalAsset(assetId, payload)

  return request<Asset>(`/assets/${assetId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteAsset(assetId: number): Promise<{ id: number }> {
  if (usesLocalStorage) return deleteLocalAsset(assetId)

  return request<{ id: number }>(`/assets/${assetId}`, {
    method: 'DELETE',
  })
}

export type CreateOfferPayload = {
  assetId: number
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  amount: number
  message?: string
}

export type Offer = {
  id: number
  assetId: number
  buyerName: string
  buyerEmail: string
  buyerPhone: string | null
  amount: number
  deposit: number
  message: string | null
  status: string
  createdAt: string
}

export function createOffer(payload: CreateOfferPayload): Promise<Offer> {
  if (usesLocalStorage) return createLocalOffer(payload)

  return request<Offer>('/offers', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getStoredOffers(): Offer[] {
  return usesLocalStorage ? readCollection<Offer>(OFFERS_KEY, []) : []
}

export type CreateSellerSubmissionPayload = {
  fullName: string
  company?: string
  email: string
  phone: string
  sector: string
  assetName: string
  description: string
  price: number
  location?: string
}

export type SellerSubmission = {
  id: number
  fullName: string
  company: string | null
  email: string
  phone: string
  sector: string
  assetName: string
  description: string
  price: number
  commission: number
  location: string | null
  status: string
  createdAt: string
}

export function createSellerSubmission(
  payload: CreateSellerSubmissionPayload,
): Promise<SellerSubmission> {
  if (usesLocalStorage) return createLocalSellerSubmission(payload)

  return request<SellerSubmission>('/seller-submissions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getStoredSellerSubmissions(): SellerSubmission[] {
  return usesLocalStorage
    ? readCollection<SellerSubmission>(SELLER_SUBMISSIONS_KEY, [])
    : []
}

function cloneCollection<T>(items: T[]): T[] {
  return JSON.parse(JSON.stringify(items)) as T[]
}

function readCollection<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      const seeded = cloneCollection(fallback)
      writeCollection(key, seeded)
      return seeded
    }

    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed)) return parsed as T[]
  } catch {
    return cloneCollection(fallback)
  }

  const seeded = cloneCollection(fallback)
  writeCollection(key, seeded)
  return seeded
}

function writeCollection<T>(key: string, items: T[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(items))
  } catch {
    // Storage may be unavailable in private browsing or locked-down browsers.
  }
}

function getNextId(items: Array<{ id: number }>) {
  return Math.max(0, ...items.map((item) => item.id)) + 1
}

function fetchLocalAssets(params: AssetListParams = {}): Promise<Asset[]> {
  const search = params.q?.trim().toLowerCase()
  const assets = readCollection<Asset>(ASSETS_KEY, seedAssets)
    .filter((asset) => !params.sector || params.sector === 'all' || asset.sector === params.sector)
    .filter((asset) => {
      if (!search) return true

      return [asset.name, asset.sector, asset.location, asset.brand, asset.seller, asset.description]
        .join(' ')
        .toLowerCase()
        .includes(search)
    })

  const sortedAssets = [...assets].sort((first, second) => {
    if (params.sort === 'price-asc') return first.price - second.price
    if (params.sort === 'price-desc') return second.price - first.price
    if (params.sort === 'recent') return second.year - first.year
    return Number(second.urgent) - Number(first.urgent)
  })

  return Promise.resolve(sortedAssets)
}

function createLocalAsset(payload: AssetPayload): Promise<Asset> {
  const assets = readCollection<Asset>(ASSETS_KEY, seedAssets)
  const asset = { id: getNextId(assets), ...payload }
  writeCollection(ASSETS_KEY, [asset, ...assets])
  return Promise.resolve(asset)
}

function updateLocalAsset(assetId: number, payload: AssetPayload): Promise<Asset> {
  const assets = readCollection<Asset>(ASSETS_KEY, seedAssets)
  const existingAsset = assets.find((asset) => asset.id === assetId)
  if (!existingAsset) return Promise.reject(new Error('Actif introuvable'))

  const updatedAsset = { ...payload, id: assetId }
  writeCollection(
    ASSETS_KEY,
    assets.map((asset) => (asset.id === assetId ? updatedAsset : asset)),
  )
  return Promise.resolve(updatedAsset)
}

function deleteLocalAsset(assetId: number): Promise<{ id: number }> {
  const assets = readCollection<Asset>(ASSETS_KEY, seedAssets)
  writeCollection(
    ASSETS_KEY,
    assets.filter((asset) => asset.id !== assetId),
  )
  return Promise.resolve({ id: assetId })
}

function createLocalOffer(payload: CreateOfferPayload): Promise<Offer> {
  const offers = readCollection<Offer>(OFFERS_KEY, [])
  const offer: Offer = {
    id: getNextId(offers),
    assetId: payload.assetId,
    buyerName: payload.buyerName,
    buyerEmail: payload.buyerEmail,
    buyerPhone: payload.buyerPhone ?? null,
    amount: payload.amount,
    deposit: Math.round(payload.amount * 0.1),
    message: payload.message ?? null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  writeCollection(OFFERS_KEY, [offer, ...offers])
  return Promise.resolve(offer)
}

function createLocalSellerSubmission(
  payload: CreateSellerSubmissionPayload,
): Promise<SellerSubmission> {
  const submissions = readCollection<SellerSubmission>(SELLER_SUBMISSIONS_KEY, [])
  const submission: SellerSubmission = {
    id: getNextId(submissions),
    fullName: payload.fullName,
    company: payload.company ?? null,
    email: payload.email,
    phone: payload.phone,
    sector: payload.sector as Sector,
    assetName: payload.assetName,
    description: payload.description,
    price: payload.price,
    commission: Math.round(payload.price * 0.03),
    location: payload.location ?? null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  writeCollection(SELLER_SUBMISSIONS_KEY, [submission, ...submissions])
  return Promise.resolve(submission)
}
