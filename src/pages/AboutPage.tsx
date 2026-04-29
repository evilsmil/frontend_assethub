import { BarChart3, Mail, Plus, ShieldCheck, Users } from 'lucide-react'
import { TrustCard } from '../components/TrustCard'

type AboutPageProps = {
  onOpenSeller: () => void
}

export function AboutPage({ onOpenSeller }: AboutPageProps) {
  return (
    <section className="page-band about-page">
      <div className="content-wrap about-layout">
        <div className="about-copy">
          <span className="section-kicker">À propos</span>
          <h2>AssetHub organise le marché secondaire des équipements professionnels.</h2>
          <p>
            Des milliards de FCFA d’équipements dorment dans les entreprises pendant que des PME
            cherchent à produire plus vite. La mission est de rendre ces actifs visibles, vérifiés
            et transactionnables avec un niveau de confiance bancaire.
          </p>
          <button className="primary-action large" type="button" onClick={onOpenSeller}>
            <Plus size={18} />
            Démarrer une publication
          </button>
        </div>
        <div className="about-grid">
          <TrustCard icon={BarChart3} title="Impact économique" text="Réduire les importations inutiles et remettre du capital productif dans le circuit local." />
          <TrustCard icon={ShieldCheck} title="Confiance opérationnelle" text="Inspection, documents, séquestre et suivi terrain pour chaque transaction sensible." />
          <TrustCard icon={Users} title="Réseau terrain" text="Agents, experts sectoriels et partenaires financiers pour accélérer les ventes qualifiées." />
          <TrustCard icon={Mail} title="Support rapide" text="Réponse commerciale sous 2h ouvrables pour vendeurs et acheteurs qualifiés." />
        </div>
      </div>
    </section>
  )
}