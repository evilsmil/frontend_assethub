import { Grid2X2, List, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { AssetCard } from '../components/AssetCard'
import { sectorFilters } from '../data/marketplace'
import type { Asset, SectorFilter, SortKey, ViewMode } from '../types/marketplace'

type CatalogPageProps = {
  favorites: Set<number>
  filteredAssets: Asset[]
  filter: SectorFilter
  loading?: boolean
  query: string
  sort: SortKey
  view: ViewMode
  onAssetOpen: (asset: Asset) => void
  onFavoriteToggle: (assetId: number) => void
  onFilterChange: (filter: SectorFilter) => void
  onQueryChange: (query: string) => void
  onSortChange: (sort: SortKey) => void
  onViewChange: (view: ViewMode) => void
}

export function CatalogPage({
  favorites,
  filteredAssets,
  filter,
  loading = false,
  query,
  sort,
  view,
  onAssetOpen,
  onFavoriteToggle,
  onFilterChange,
  onQueryChange,
  onSortChange,
  onViewChange,
}: CatalogPageProps) {
  return (
    <section className="page-band catalog-page">
      <div className="content-wrap catalog-layout">
        <aside className="filter-panel">
          <div className="panel-title">
            <SlidersHorizontal size={18} />
            Filtres
          </div>
          <div className="filter-stack">
            {sectorFilters.map((sector) => {
              const Icon = sector.icon

              return (
                <button
                  className={`filter-pill ${filter === sector.key ? 'active' : ''}`}
                  key={sector.key}
                  type="button"
                  onClick={() => onFilterChange(sector.key)}
                >
                  <Icon size={16} />
                  <span>{sector.label}</span>
                </button>
              )
            })}
          </div>
          <div className="assurance-box">
            <ShieldCheck size={20} />
            <strong>Actifs qualifiés</strong>
            <span>Chaque annonce prioritaire reçoit un contrôle documentaire et une visite terrain avant transaction.</span>
          </div>
        </aside>

        <div className="catalog-main">
          <div className="catalog-header">
            <div>
              <span className="section-kicker">Catalogue</span>
              <h2>Actifs professionnels disponibles</h2>
              <p>{filteredAssets.length} résultat{filteredAssets.length > 1 ? 's' : ''} correspondant{filteredAssets.length > 1 ? 's' : ''}</p>
            </div>
            <div className="catalog-controls">
              <label className="search-field">
                <Search size={18} />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder="Rechercher par actif, ville, marque..."
                />
              </label>
              <div className="control-row">
                <select
                  className="select-control"
                  value={sort}
                  onChange={(event) => onSortChange(event.target.value as SortKey)}
                  aria-label="Trier les actifs"
                >
                  <option value="featured">Priorité plateforme</option>
                  <option value="recent">Plus récents</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
                <div className="segmented-control" aria-label="Mode d’affichage">
                  <button
                    className={view === 'grid' ? 'active' : ''}
                    type="button"
                    onClick={() => onViewChange('grid')}
                    aria-label="Vue grille"
                  >
                    <Grid2X2 size={17} />
                  </button>
                  <button
                    className={view === 'list' ? 'active' : ''}
                    type="button"
                    onClick={() => onViewChange('list')}
                    aria-label="Vue liste"
                  >
                    <List size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`assets-grid ${view === 'list' ? 'list-view' : ''}`}>
            {loading ? (
              <div className="empty-state">
                <Search size={36} />
                <h3>Chargement du catalogue…</h3>
                <p>Récupération des actifs depuis le serveur AssetHub.</p>
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="empty-state">
                <Search size={36} />
                <h3>Aucun actif trouvé</h3>
                <p>Modifiez la recherche ou les filtres pour élargir le catalogue.</p>
              </div>
            ) : (
              filteredAssets.map((asset) => (
                <AssetCard
                  asset={asset}
                  isFavorite={favorites.has(asset.id)}
                  key={asset.id}
                  view={view}
                  onAssetOpen={onAssetOpen}
                  onFavoriteToggle={onFavoriteToggle}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}