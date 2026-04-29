import type { Asset, AssetPayload } from '../types/marketplace'

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000/api'

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
  const search = new URLSearchParams()
  if (params.sector && params.sector !== 'all') search.set('sector', params.sector)
  if (params.q) search.set('q', params.q)
  if (params.sort) search.set('sort', params.sort)
  const query = search.toString()
  return request<Asset[]>(`/assets${query ? `?${query}` : ''}`)
}

export function createAsset(payload: AssetPayload): Promise<Asset> {
  return request<Asset>('/assets', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateAsset(assetId: number, payload: AssetPayload): Promise<Asset> {
  return request<Asset>(`/assets/${assetId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteAsset(assetId: number): Promise<{ id: number }> {
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
  return request<Offer>('/offers', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
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
  return request<SellerSubmission>('/seller-submissions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
