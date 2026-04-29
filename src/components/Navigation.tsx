import { Menu, Plus, Search, X } from 'lucide-react'
import { navItems } from '../data/marketplace'
import type { Page } from '../types/marketplace'

type NavigationProps = {
  activePage: Page
  mobileOpen: boolean
  onMobileToggle: () => void
  onPageOpen: (page: Page) => void
}

export function Navigation({
  activePage,
  mobileOpen,
  onMobileToggle,
  onPageOpen,
}: NavigationProps) {
  return (
    <>
      <header className="topbar">
        <button
          className="brand-button"
          type="button"
          onClick={() => onPageOpen('home')}
          aria-label="Retour à l’accueil AssetHub"
        >
          <span className="brand-mark">AH</span>
          <span className="brand-copy">
            <strong>AssetHub</strong>
            <span>Cameroun</span>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button
              className={`nav-link ${activePage === item.page ? 'active' : ''}`}
              key={item.page}
              type="button"
              onClick={() => onPageOpen(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            className="ghost-action"
            type="button"
            onClick={() => onPageOpen('catalog')}
          >
            <Search size={16} />
            <span>Rechercher</span>
          </button>
          <button
            className="primary-action"
            type="button"
            onClick={() => onPageOpen('seller')}
          >
            <Plus size={16} />
            <span>Publier</span>
          </button>
          <button
            className="mobile-menu-button"
            type="button"
            onClick={onMobileToggle}
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <button
              className={`mobile-nav-link ${activePage === item.page ? 'active' : ''}`}
              key={item.page}
              type="button"
              onClick={() => onPageOpen(item.page)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}