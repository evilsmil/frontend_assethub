import { Mail, Phone } from 'lucide-react'
import type { Page, SectorFilter } from '../types/marketplace'

type FooterProps = {
  onFilterOpen: (filter: SectorFilter) => void
  onPageOpen: (page: Page) => void
}

export function Footer({ onFilterOpen, onPageOpen }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="content-wrap footer-grid">
        <div>
          <div className="footer-brand">
            <span className="brand-mark">AH</span>
            <strong>AssetHub Cameroun</strong>
          </div>
          <p>
            Marketplace B2B de cession d’actifs professionnels, avec qualification terrain,
            séquestre et convention de cession.
          </p>
        </div>
        <div>
          <h4>Plateforme</h4>
          <button type="button" onClick={() => onPageOpen('catalog')}>Catalogue</button>
          <button type="button" onClick={() => onPageOpen('seller')}>Publier un actif</button>
        </div>
        <div>
          <h4>Secteurs</h4>
          <button type="button" onClick={() => onFilterOpen('Énergie')}>Énergie</button>
          <button type="button" onClick={() => onFilterOpen('BTP')}>BTP</button>
          <button type="button" onClick={() => onFilterOpen('Transport')}>Transport</button>
        </div>
        <div>
          <h4>Contact</h4>
          <span><Phone size={15} /> (+237) 688 717 889 / 677 177 890 / 699 688 665</span>
          <span><Mail size={15} /> contact@assethub.cm</span>
        </div>
      </div>
    </footer>
  )
}