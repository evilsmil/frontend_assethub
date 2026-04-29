import { Eye, Image, Pencil, Plus, Save, Search, ShieldCheck, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { sectorFilters } from '../data/marketplace'
import type { Asset, AssetPayload } from '../types/marketplace'
import { formatCurrency } from '../utils/currency'

type AdminPageProps = {
  assets: Asset[]
  loading: boolean
  onAssetDelete: (assetId: number) => Promise<void>
  onAssetOpen: (asset: Asset) => void
  onAssetSave: (payload: AssetPayload, assetId?: number) => Promise<void>
}

const conditionOptions: Asset['condition'][] = [
  'Très bon état',
  'Bon état',
  'État correct',
]

function getAssetPayload(data: FormData): AssetPayload {
  const tags = String(data.get('tags') ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  return {
    name: String(data.get('name') ?? ''),
    sector: String(data.get('sector') ?? 'Énergie') as Asset['sector'],
    price: Math.round(Number(data.get('price') ?? 0)),
    location: String(data.get('location') ?? ''),
    year: Math.round(Number(data.get('year') ?? new Date().getFullYear())),
    condition: String(data.get('condition') ?? 'Bon état') as Asset['condition'],
    brand: String(data.get('brand') ?? ''),
    usage: String(data.get('usage') ?? ''),
    seller: String(data.get('seller') ?? ''),
    description: String(data.get('description') ?? ''),
    image: String(data.get('image') ?? ''),
    accent: String(data.get('accent') ?? '#f1f5ff'),
    urgent: data.has('urgent'),
    certified: data.has('certified'),
    tags,
  }
}

export function AdminPage({
  assets,
  loading,
  onAssetDelete,
  onAssetOpen,
  onAssetSave,
}: AdminPageProps) {
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [query, setQuery] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const visibleAssets = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return assets

    return assets.filter((asset) =>
      [asset.name, asset.sector, asset.location, asset.brand, asset.seller]
        .join(' ')
        .toLowerCase()
        .includes(search),
    )
  }, [assets, query])

  async function submitAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const payload = getAssetPayload(new FormData(form))

    setSaving(true)
    try {
      await onAssetSave(payload, editingAsset?.id)
      form.reset()
      setEditingAsset(null)
    } finally {
      setSaving(false)
    }
  }

  async function removeAsset(asset: Asset) {
    const confirmed = window.confirm(`Supprimer ${asset.name} du catalogue ?`)
    if (!confirmed) return

    setDeletingId(asset.id)
    try {
      await onAssetDelete(asset.id)
      if (editingAsset?.id === asset.id) setEditingAsset(null)
    } finally {
      setDeletingId(null)
    }
  }

  const formKey = editingAsset ? `edit-${editingAsset.id}` : 'create-asset'

  return (
    <section className="page-band admin-page">
      <div className="content-wrap admin-heading">
        <div>
          <span className="section-kicker">Administration</span>
          <h2>Catalogue AssetHub</h2>
        </div>
        <div className="admin-summary">
          <span>{assets.length} actifs</span>
          <span>{assets.filter((asset) => asset.certified).length} vérifiés</span>
          <span>{assets.filter((asset) => asset.urgent).length} urgents</span>
        </div>
      </div>

      <div className="content-wrap admin-layout">
        <form className="seller-form admin-form" key={formKey} onSubmit={submitAsset}>
          <div className="form-section">
            <div className="form-title">
              <span>1</span>
              <strong>{editingAsset ? 'Modifier l’actif' : 'Nouvel actif'}</strong>
            </div>

            <label>
              Nom de l’actif
              <input required name="name" defaultValue={editingAsset?.name} maxLength={100} />
            </label>

            <div className="form-grid">
              <label>
                Secteur
                <select required name="sector" defaultValue={editingAsset?.sector ?? 'Énergie'}>
                  {sectorFilters
                    .filter((sector) => sector.key !== 'all')
                    .map((sector) => (
                      <option key={sector.key} value={sector.key}>{sector.label}</option>
                    ))}
                </select>
              </label>
              <label>
                État
                <select required name="condition" defaultValue={editingAsset?.condition ?? 'Bon état'}>
                  {conditionOptions.map((condition) => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Description
              <textarea required name="description" defaultValue={editingAsset?.description} maxLength={1000} />
            </label>

            <label>
              Tags
              <input name="tags" defaultValue={editingAsset?.tags.join(', ')} />
            </label>
          </div>

          <div className="form-section">
            <div className="form-title">
              <span>2</span>
              <strong>Détails commerciaux</strong>
            </div>

            <div className="form-grid">
              <label>
                Prix FCFA
                <input required min={1} name="price" type="number" defaultValue={editingAsset?.price} />
              </label>
              <label>
                Année
                <input required min={1990} name="year" type="number" defaultValue={editingAsset?.year ?? new Date().getFullYear()} />
              </label>
            </div>

            <div className="form-grid">
              <label>
                Localisation
                <input required name="location" defaultValue={editingAsset?.location} />
              </label>
              <label>
                Marque / modèle
                <input required name="brand" defaultValue={editingAsset?.brand} />
              </label>
            </div>

            <div className="form-grid">
              <label>
                Usage
                <input required name="usage" defaultValue={editingAsset?.usage} />
              </label>
              <label>
                Vendeur
                <input required name="seller" defaultValue={editingAsset?.seller} />
              </label>
            </div>
          </div>

          <div className="form-section">
            <div className="form-title">
              <span>3</span>
              <strong>Publication</strong>
            </div>

            <label>
              Image URL
              <input required name="image" type="url" defaultValue={editingAsset?.image} />
            </label>

            <label className="admin-color-field">
              Accent
              <input name="accent" type="color" defaultValue={editingAsset?.accent ?? '#f1f5ff'} />
            </label>

            <div className="admin-checkboxes">
              <label className="check-field">
                <input name="urgent" type="checkbox" defaultChecked={editingAsset?.urgent ?? false} />
                <span>Urgent</span>
              </label>
              <label className="check-field">
                <input name="certified" type="checkbox" defaultChecked={editingAsset?.certified ?? true} />
                <span>Vérifié</span>
              </label>
            </div>

            <div className="admin-form-actions">
              <button className="primary-action submit-action" type="submit" disabled={saving}>
                <Save size={18} />
                {saving ? 'Enregistrement…' : editingAsset ? 'Enregistrer' : 'Créer l’actif'}
              </button>
              {editingAsset ? (
                <button className="secondary-action" type="button" onClick={() => setEditingAsset(null)}>
                  <X size={17} />
                  Annuler
                </button>
              ) : null}
            </div>
          </div>
        </form>

        <div className="admin-list-panel">
          <div className="admin-list-head">
            <div>
              <span className="section-kicker">Inventaire</span>
              <h3>Actifs publiés</h3>
            </div>
            <button className="secondary-action compact" type="button" onClick={() => setEditingAsset(null)}>
              <Plus size={15} />
              Nouveau
            </button>
          </div>

          <label className="search-field admin-search">
            <Search size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un actif"
            />
          </label>

          <div className="admin-assets-list">
            {loading ? (
              <div className="admin-empty">
                <Search size={28} />
                <span>Chargement du catalogue…</span>
              </div>
            ) : visibleAssets.length === 0 ? (
              <div className="admin-empty">
                <Search size={28} />
                <span>Aucun actif</span>
              </div>
            ) : (
              visibleAssets.map((asset) => (
                <article className="admin-asset-row" key={asset.id}>
                  <button className="admin-asset-media" type="button" onClick={() => onAssetOpen(asset)}>
                    {asset.image ? <img src={asset.image} alt={asset.name} /> : <Image size={24} />}
                  </button>

                  <div className="admin-asset-main">
                    <div>
                      <strong>{asset.name}</strong>
                      <span>{asset.sector} · {asset.location} · {asset.year}</span>
                    </div>
                    <div className="asset-meta">
                      <span>{formatCurrency(asset.price)}</span>
                      {asset.certified ? <span><ShieldCheck size={13} /> Vérifié</span> : null}
                      {asset.urgent ? <span className="condition fair">Urgent</span> : null}
                    </div>
                  </div>

                  <div className="admin-row-actions">
                    <button className="icon-button neutral-action" type="button" onClick={() => onAssetOpen(asset)} aria-label="Voir l’actif" title="Voir">
                      <Eye size={16} />
                    </button>
                    <button className="icon-button neutral-action" type="button" onClick={() => setEditingAsset(asset)} aria-label="Modifier l’actif" title="Modifier">
                      <Pencil size={16} />
                    </button>
                    <button
                      className="icon-button danger-action"
                      type="button"
                      onClick={() => void removeAsset(asset)}
                      disabled={deletingId === asset.id}
                      aria-label="Supprimer l’actif"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}