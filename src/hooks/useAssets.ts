import { useEffect, useState } from 'react'
import { fetchAssets } from '../lib/api'
import type { Asset } from '../types/marketplace'

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    void fetchAssets()
      .then((data) => {
        if (cancelled) return
        setAssets(data)
        setError(null)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  function upsertAsset(asset: Asset) {
    setAssets((current) => {
      const exists = current.some((item) => item.id === asset.id)
      if (!exists) return [asset, ...current]
      return current.map((item) => (item.id === asset.id ? asset : item))
    })
  }

  function removeAsset(assetId: number) {
    setAssets((current) => current.filter((asset) => asset.id !== assetId))
  }

  return { assets, loading, error, upsertAsset, removeAsset }
}
