import { ArrowRight, Heart, MapPin } from 'lucide-react'
import { getConditionClass } from '../utils/asset'
import { formatCurrency } from '../utils/currency'
import type { Asset, ViewMode } from '../types/marketplace'

type AssetCardProps = {
  asset: Asset
  isFavorite: boolean
  view: ViewMode
  onAssetOpen: (asset: Asset) => void
  onFavoriteToggle: (assetId: number) => void
}

export function AssetCard({
  asset,
  isFavorite,
  view,
  onAssetOpen,
  onFavoriteToggle,
}: AssetCardProps) {
  return (
    <article className={`asset-card ${view === 'list' ? 'asset-card-list' : ''}`}>
      <button className="asset-media" type="button" onClick={() => onAssetOpen(asset)}>
        <img src={asset.image} alt={asset.name} />
        <span className="media-overlay" style={{ backgroundColor: asset.accent }} />
        <span className="asset-badges">
          {asset.urgent && <span className="badge urgent">Urgent</span>}
          {asset.certified && <span className="badge verified">Vérifié</span>}
        </span>
      </button>
      <div className="asset-content">
        <div className="asset-topline">
          <span>{asset.sector}</span>
          <button
            className={`icon-button ${isFavorite ? 'active' : ''}`}
            type="button"
            onClick={() => onFavoriteToggle(asset.id)}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <button className="asset-title" type="button" onClick={() => onAssetOpen(asset)}>
          {asset.name}
        </button>
        <p>{asset.description}</p>
        <div className="asset-meta">
          <span><MapPin size={14} /> {asset.location}</span>
          <span>{asset.year}</span>
          <span className={getConditionClass(asset.condition)}>{asset.condition}</span>
        </div>
        <div className="tag-row">
          {asset.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="asset-footer">
          <strong>{formatCurrency(asset.price)}</strong>
          <button className="secondary-action compact" type="button" onClick={() => onAssetOpen(asset)}>
            Voir le dossier
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}