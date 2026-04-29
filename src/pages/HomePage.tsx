import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  ChevronRight,
  Clock3,
  Landmark,
  Package,
  Plus,
  Quote,
  Scale,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import { StatBlock } from '../components/StatBlock'
import { sectorFilters, testimonials, trustedCompanies } from '../data/marketplace'
import cleanEnergyLogo from '../assets/clean-energy-services.svg'
import { compactCurrency, formatCurrency } from '../utils/currency'
import type { Asset, SectorFilter } from '../types/marketplace'

type HomePageProps = {
  assets: Asset[]
  onAssetOpen: (asset: Asset) => void
  onCatalogOpen: () => void
  onFilterOpen: (filter: SectorFilter) => void
  onSellerOpen: () => void
}

export function HomePage({
  assets,
  onAssetOpen,
  onCatalogOpen,
  onFilterOpen,
  onSellerOpen,
}: HomePageProps) {
  const featuredAssets = assets.filter((asset) => asset.urgent).slice(0, 3)
  const trendingAssets = assets
    .filter((asset) => asset.certified)
    .sort((first, second) => Number(second.urgent) - Number(first.urgent))
    .slice(0, 4)
  const testimonialGroups = [testimonials, testimonials]

  return (
    <>
      <section className="hero-section page-band dark-band">
        <div className="hero-grid content-wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <BadgeCheck size={16} />
              Première marketplace B2B d’actifs productifs au Cameroun
            </div>
            <h1>La bourse opérationnelle des équipements professionnels.</h1>
            <p>
              AssetHub transforme les actifs dormants en liquidité pour les entreprises,
              avec qualification terrain, séquestre bancaire et dossier de cession conforme
              au droit OHADA.
            </p>
            <div className="hero-actions">
              <button className="primary-action large" type="button" onClick={onSellerOpen}>
                <Plus size={18} />
                Publier un actif
              </button>
              <button className="secondary-action large" type="button" onClick={onCatalogOpen}>
                <Package size={18} />
                Voir le Catalogue
              </button>
            </div>
          </div>

          <div className="market-board" aria-label="Actifs prioritaires">
            <div className="board-header">
              <span>Actifs prioritaires</span>
              <button type="button" onClick={onCatalogOpen}>
                Voir tout
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="board-list">
              {featuredAssets.map((asset) => (
                <button
                  className="board-row"
                  key={asset.id}
                  type="button"
                  onClick={() => onAssetOpen(asset)}
                >
                  <img src={asset.image} alt={asset.name} />
                  <span>
                    <strong>{asset.name}</strong>
                    <small>{asset.location} · {asset.condition}</small>
                  </span>
                  <b>{compactCurrency(asset.price)}</b>
                </button>
              ))}
            </div>
            <div className="board-footer">
              <span><ShieldCheck size={15} /> Séquestre bancaire</span>
              <span><Scale size={15} /> Dossier OHADA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="content-wrap stats-grid">
          <StatBlock icon={Banknote} value="3%" label="Commission uniquement à la vente" />
          <StatBlock icon={Package} value="0 FCFA" label="Publication et qualification initiale" />
          <StatBlock icon={Landmark} value="100%" label="Paiement sécurisé avant livraison" />
          <StatBlock icon={Clock3} value="24h" label="Première validation opérationnelle" />
        </div>
      </section>

      <section className="page-band trending-section">
        <SectionTitle
          label="Produits en vogue"
          title="Les actifs les plus consultés cette semaine."
          description="Une sélection courte d’équipements certifiés, priorisés selon la demande, la disponibilité et la qualité du dossier vendeur."
          variant="glassCenter"
        />

        <div className="content-wrap trending-grid">
          {trendingAssets.map((asset) => (
            <article className="trending-card" key={asset.id}>
              <button className="trending-media" type="button" onClick={() => onAssetOpen(asset)}>
                <img src={asset.image} alt={asset.name} />
                <span>{asset.sector}</span>
              </button>
              <div className="trending-content">
                <div>
                  <h3>{asset.name}</h3>
                  <p>{asset.location} · {asset.condition} · {asset.year}</p>
                </div>
                <strong>{formatCurrency(asset.price)}</strong>
                <button className="secondary-action compact" type="button" onClick={() => onAssetOpen(asset)}>
                  Voir le dossier
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="content-wrap trending-actions">
          <button className="primary-action large" type="button" onClick={onCatalogOpen}>
            <Package size={18} />
            Voir tout le catalogue
          </button>
        </div>
      </section>

      <section className="page-band">
        <SectionTitle
          label="Secteurs couverts"
          title="Une place de marché pensée pour les actifs qui produisent."
          description="Les catégories prioritaires couvrent l’énergie, le BTP, le transport, l’agriculture, les infrastructures IT et l’hôtellerie professionnelle."
          variant="sectorCompact"
        />
        <div className="content-wrap sector-grid">
          {sectorFilters
            .filter((sector) => sector.key !== 'all')
            .map((sector) => {
              const Icon = sector.icon
              const count = assets.filter((asset) => asset.sector === sector.key).length

              return (
                <button
                  className="sector-card"
                  key={sector.key}
                  type="button"
                  onClick={() => onFilterOpen(sector.key)}
                >
                  <Icon size={24} />
                  <strong>{sector.label}</strong>
                  <span>{count} actif{count > 1 ? 's' : ''} disponible{count > 1 ? 's' : ''}</span>
                </button>
              )
            })}
        </div>
      </section>

      <section className="page-band companies-section">
        <div className="content-wrap companies-simple-heading">
          <span>Ils nous font confiance</span>
        </div>

        <div className="content-wrap company-grid" aria-label="Entreprises qui nous font confiance">
          {trustedCompanies.map((company) => (
            <div className="company-tile" key={company.name} aria-label={company.name}>
              <img src={cleanEnergyLogo} alt="" />
            </div>
          ))}
        </div>
      </section>

      <section className="page-band testimonials-section">
        <SectionTitle
          index="04"
          label="Commentaires clients"
          title="Ce que disent les équipes qui passent par AssetHub."
        //   description="Les retours mettent l’accent sur la qualification terrain, la clarté du dossier vendeur et la sécurité du paiement avant livraison."
        />

        <div className="testimonials-carousel" aria-label="Commentaires clients">
          <div className="testimonials-track">
            {testimonialGroups.map((group, groupIndex) => (
              <div className="testimonials-group" key={groupIndex} aria-hidden={groupIndex === 1}>
                {group.map((testimonial) => (
                  <article className="testimonial-card" key={`${testimonial.author}-${groupIndex}`}>
                    <div className="testimonial-icon">
                      <Quote size={22} />
                    </div>
                    <p>{testimonial.quote}</p>
                    <div className="testimonial-footer">
                      <span>
                        <strong>{testimonial.author}</strong>
                        <small>{testimonial.role}</small>
                      </span>
                      <em><Star size={14} /> {testimonial.metric}</em>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="content-wrap home-cta">
          <div>
            <span className="section-kicker">Passer à l’action</span>
            <h2>Transformez vos actifs dormants en opportunités concrètes.</h2>
            <p>
              Publiez gratuitement un actif ou explorez les équipements déjà qualifiés
              par secteur, budget et localisation.
            </p>
          </div>
          <div className="home-cta-actions">
            <button className="primary-action large" type="button" onClick={onSellerOpen}>
              <Plus size={18} />
              Publier un actif
            </button>
            <button className="secondary-action large" type="button" onClick={onCatalogOpen}>
              <Package size={18} />
              Voir le Catalogue
            </button>
          </div>
        </div>
      </section>
    </>
  )
}