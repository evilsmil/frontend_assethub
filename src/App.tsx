import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { AssetModal } from './components/AssetModal'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import { Toast } from './components/Toast'
import { useAssets } from './hooks/useAssets'
import {
  createAsset,
  createOffer,
  createSellerSubmission,
  deleteAsset,
  getStoredOffers,
  getStoredSellerSubmissions,
  updateAsset,
  usesLocalStorage,
} from './lib/api'
import type { Offer, SellerSubmission } from './lib/api'
import { AboutPage } from './pages/AboutPage'
import { AdminPage } from './pages/AdminPage'
import { CatalogPage } from './pages/CatalogPage'
import { HomePage } from './pages/HomePage'
import { HowPage } from './pages/HowPage'
import { SellerPage } from './pages/SellerPage'
import type { Asset, AssetPayload, Audience, Page, SectorFilter, SortKey, ViewMode } from './types/marketplace'
import './App.css'

function isAdminPath() {
  return window.location.pathname.replace(/\/+$/, '') === '/admin'
}

function getInitialPage(): Page {
  return isAdminPath() ? 'admin' : 'home'
}

function App() {
  const [activePage, setActivePage] = useState<Page>(() => getInitialPage())
  const [mobileOpen, setMobileOpen] = useState(false)
  const [filter, setFilter] = useState<SectorFilter>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('featured')
  const [view, setView] = useState<ViewMode>('grid')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [favorites, setFavorites] = useState<Set<number>>(() => new Set())
  const [toast, setToast] = useState('')
  const [sellerSubmitted, setSellerSubmitted] = useState(false)
  const [sellerPrice, setSellerPrice] = useState('')
  const [offerAmount, setOfferAmount] = useState('')
  const [offerSent, setOfferSent] = useState(false)
  const [audience, setAudience] = useState<Audience>('seller')
  const [storedOffers, setStoredOffers] = useState<Offer[]>(() => getStoredOffers())
  const [storedSellerSubmissions, setStoredSellerSubmissions] = useState<SellerSubmission[]>(() =>
    getStoredSellerSubmissions(),
  )
  const toastTimer = useRef<number | null>(null)
  const {
    assets,
    loading: assetsLoading,
    error: assetsError,
    upsertAsset,
    removeAsset,
  } = useAssets()

  useEffect(() => {
    function handlePopState() {
      setActivePage(getInitialPage())
      setMobileOpen(false)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    if (!usesLocalStorage && assetsError) notify(`Connexion API impossible : ${assetsError}`)
  }, [assetsError])

  useEffect(() => {
    if (!usesLocalStorage) return

    function refreshStoredRecords() {
      setStoredOffers(getStoredOffers())
      setStoredSellerSubmissions(getStoredSellerSubmissions())
    }

    window.addEventListener('storage', refreshStoredRecords)

    return () => {
      window.removeEventListener('storage', refreshStoredRecords)
    }
  }, [])

  const filteredAssets = useMemo(() => {
    const search = query.trim().toLowerCase()
    const results = assets.filter((asset) => {
      const matchesFilter = filter === 'all' || asset.sector === filter
      const matchesSearch =
        !search ||
        [
          asset.name,
          asset.sector,
          asset.location,
          asset.brand,
          asset.seller,
          asset.description,
        ]
          .join(' ')
          .toLowerCase()
          .includes(search)

      return matchesFilter && matchesSearch
    })

    return [...results].sort((first, second) => {
      if (sort === 'price-asc') return first.price - second.price
      if (sort === 'price-desc') return second.price - first.price
      if (sort === 'recent') return second.year - first.year
      return Number(second.urgent) - Number(first.urgent)
    })
  }, [assets, filter, query, sort])

  const sellerPriceValue = Number(sellerPrice) || 0
  const sellerCommission = Math.round(sellerPriceValue * 0.03)
  const offerValue = Number(offerAmount) || selectedAsset?.price || 0
  const offerDeposit = Math.round(offerValue * 0.1)

  useEffect(() => {
    document.body.style.overflow = selectedAsset ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedAsset])

  function notify(message: string) {
    setToast(message)

    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current)
    }

    toastTimer.current = window.setTimeout(() => setToast(''), 3600)
  }

  function openPage(page: Page) {
    if (page !== 'admin' && isAdminPath()) {
      window.history.pushState(null, '', '/')
    }

    setActivePage(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function filterAndOpenCatalog(nextFilter: SectorFilter) {
    setFilter(nextFilter)
    openPage('catalog')
  }

  function toggleFavorite(assetId: number) {
    const isFavorite = favorites.has(assetId)

    setFavorites((current) => {
      const next = new Set(current)
      if (isFavorite) {
        next.delete(assetId)
      } else {
        next.add(assetId)
      }
      return next
    })

    notify(isFavorite ? 'Actif retiré des favoris.' : 'Actif ajouté aux favoris.')
  }

  function openAsset(asset: Asset) {
    setSelectedAsset(asset)
    setOfferAmount(String(asset.price))
    setOfferSent(false)
  }

  function submitSeller(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      assetName: String(data.get('assetName') ?? ''),
      sector: String(data.get('sector') ?? ''),
      description: String(data.get('description') ?? ''),
      price: Number(data.get('price') ?? 0),
      location: String(data.get('location') ?? '') || undefined,
      fullName: String(data.get('fullName') ?? ''),
      company: String(data.get('company') ?? '') || undefined,
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
    }

    createSellerSubmission(payload)
      .then((submission) => {
        if (usesLocalStorage) {
          setStoredSellerSubmissions((current) => [submission, ...current])
        }
        setSellerSubmitted(true)
        notify(usesLocalStorage ? 'Votre actif a été enregistré dans ce navigateur.' : 'Votre actif a été enregistré côté serveur.')
      })
      .catch((err: unknown) => {
        notify(`Soumission impossible : ${err instanceof Error ? err.message : 'erreur inconnue'}`)
      })
  }

  function resetSeller() {
    setSellerSubmitted(false)
    setSellerPrice('')
    notify('Formulaire prêt pour un nouvel actif.')
  }

  function submitOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedAsset) return
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      assetId: selectedAsset.id,
      buyerName: String(data.get('buyerName') ?? ''),
      buyerEmail: String(data.get('buyerEmail') ?? ''),
      buyerPhone: String(data.get('buyerPhone') ?? '') || undefined,
      amount: Number(data.get('amount') ?? offerValue),
    }

    createOffer(payload)
      .then((offer) => {
        if (usesLocalStorage) {
          setStoredOffers((current) => [offer, ...current])
        }
        setOfferSent(true)
        notify(usesLocalStorage ? 'Offre enregistrée dans ce navigateur.' : 'Offre envoyée au serveur. Un agent vous recontacte sous 2h.')
      })
      .catch((err: unknown) => {
        notify(`Envoi de l’offre impossible : ${err instanceof Error ? err.message : 'erreur inconnue'}`)
      })
  }

  async function saveCatalogAsset(payload: AssetPayload, assetId?: number) {
    try {
      const savedAsset = assetId
        ? await updateAsset(assetId, payload)
        : await createAsset(payload)

      upsertAsset(savedAsset)
      setSelectedAsset((current) => (current?.id === savedAsset.id ? savedAsset : current))
      if (usesLocalStorage) {
        notify(assetId ? 'Actif mis à jour dans le catalogue local.' : 'Actif ajouté au catalogue local.')
      } else {
        notify(assetId ? 'Actif mis à jour dans le catalogue.' : 'Actif ajouté au catalogue.')
      }
    } catch (err: unknown) {
      notify(`Enregistrement impossible : ${err instanceof Error ? err.message : 'erreur inconnue'}`)
      throw err
    }
  }

  async function removeCatalogAsset(assetId: number) {
    try {
      await deleteAsset(assetId)
      removeAsset(assetId)
      setSelectedAsset((current) => (current?.id === assetId ? null : current))
      notify(usesLocalStorage ? 'Actif supprimé du catalogue local.' : 'Actif supprimé du catalogue.')
    } catch (err: unknown) {
      notify(`Suppression impossible : ${err instanceof Error ? err.message : 'erreur inconnue'}`)
      throw err
    }
  }

  function renderPage() {
    if (activePage === 'catalog') {
      return (
        <CatalogPage
          favorites={favorites}
          filteredAssets={filteredAssets}
          filter={filter}
          loading={assetsLoading}
          query={query}
          sort={sort}
          view={view}
          onAssetOpen={openAsset}
          onFavoriteToggle={toggleFavorite}
          onFilterChange={setFilter}
          onQueryChange={setQuery}
          onSortChange={setSort}
          onViewChange={setView}
        />
      )
    }

    if (activePage === 'seller') {
      return (
        <SellerPage
          commission={sellerCommission}
          isSubmitted={sellerSubmitted}
          price={sellerPrice}
          priceValue={sellerPriceValue}
          onPriceChange={setSellerPrice}
          onReset={resetSeller}
          onSubmit={submitSeller}
        />
      )
    }

    if (activePage === 'how') {
      return (
        <HowPage
          audience={audience}
          onAudienceChange={setAudience}
        />
      )
    }

    if (activePage === 'about') {
      return <AboutPage onOpenSeller={() => openPage('seller')} />
    }

    if (activePage === 'admin') {
      return (
        <AdminPage
          assets={assets}
          offline={usesLocalStorage}
          loading={assetsLoading}
          offers={storedOffers}
          onAssetDelete={removeCatalogAsset}
          onAssetOpen={openAsset}
          onAssetSave={saveCatalogAsset}
          sellerSubmissions={storedSellerSubmissions}
        />
      )
    }

    return (
      <HomePage
        assets={assets}
        onAssetOpen={openAsset}
        onCatalogOpen={() => openPage('catalog')}
        onFilterOpen={filterAndOpenCatalog}
        onSellerOpen={() => openPage('seller')}
      />
    )
  }

  return (
    <div className="app-shell">
      <Navigation
        activePage={activePage}
        mobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((open) => !open)}
        onPageOpen={openPage}
      />

      <main>{renderPage()}</main>

      <Footer onPageOpen={openPage} onFilterOpen={filterAndOpenCatalog} />

      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          deposit={offerDeposit}
          offerAmount={offerAmount}
          offerSent={offerSent}
          offerValue={offerValue}
          onClose={() => setSelectedAsset(null)}
          onOfferAmountChange={setOfferAmount}
          onOfferSubmit={submitOffer}
        />
      )}

      <FloatingWhatsApp />
      <Toast message={toast} />
    </div>
  )
}

export default App