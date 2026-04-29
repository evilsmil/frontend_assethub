import { Building2, Landmark, LockKeyhole, Package, Scale } from 'lucide-react'
import { TrustCard } from '../components/TrustCard'
import { buyerSteps, sellerSteps } from '../data/marketplace'
import type { Audience } from '../types/marketplace'

type HowPageProps = {
  audience: Audience
  onAudienceChange: (audience: Audience) => void
}

export function HowPage({ audience, onAudienceChange }: HowPageProps) {
  const steps = audience === 'seller' ? sellerSteps : buyerSteps

  return (
    <section className="page-band">
      <div className="content-wrap section-heading centered-heading">
        <span className="section-kicker">Processus</span>
        <h2>Un parcours encadré de bout en bout.</h2>
        <p>
          La plateforme combine qualification, mise en relation, séquestre et livraison contrôlée
          pour réduire le risque des deux côtés.
        </p>
      </div>
      <div className="content-wrap how-tabs">
        <button
          className={audience === 'seller' ? 'active' : ''}
          type="button"
          onClick={() => onAudienceChange('seller')}
        >
          <Building2 size={17} />
          Je vends
        </button>
        <button
          className={audience === 'buyer' ? 'active' : ''}
          type="button"
          onClick={() => onAudienceChange('buyer')}
        >
          <Package size={17} />
          J’achète
        </button>
      </div>
      <div className="content-wrap process-grid">
        {steps.map((step, index) => {
          const Icon = step.icon

          return (
            <article className="process-card" key={step.title}>
              <span className="step-number">{index + 1}</span>
              <Icon size={25} />
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          )
        })}
      </div>
      <div className="content-wrap trust-grid">
        <TrustCard icon={Landmark} title="Séquestre bancaire" text="Les fonds sont conservés avant livraison et débloqués uniquement après PV signé." />
        <TrustCard icon={Scale} title="Cadre OHADA" text="La transaction s’appuie sur une convention de cession exploitable juridiquement." />
        <TrustCard icon={LockKeyhole} title="Anonymat contrôlé" text="Les contacts vendeur sont protégés jusqu’à l’engagement formel de l’acheteur." />
      </div>
    </section>
  )
}