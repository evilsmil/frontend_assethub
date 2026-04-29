import { BadgeCheck, Check, CheckCircle2, Landmark, Phone, Plus, Scale, Send, ShieldCheck, Upload } from 'lucide-react'
import { sectorFilters } from '../data/marketplace'
import { formatCurrency } from '../utils/currency'
import type { FormSubmitHandler } from '../types/marketplace'

type SellerPageProps = {
  commission: number
  isSubmitted: boolean
  price: string
  priceValue: number
  onPriceChange: (price: string) => void
  onReset: () => void
  onSubmit: FormSubmitHandler
}

export function SellerPage({
  commission,
  isSubmitted,
  price,
  priceValue,
  onPriceChange,
  onReset,
  onSubmit,
}: SellerPageProps) {
  if (isSubmitted) {
    return (
      <section className="page-band seller-page">
        <div className="content-wrap narrow-wrap">
          <div className="success-panel">
            <CheckCircle2 size={52} />
            <h2>Actif soumis avec succès</h2>
            <p>
              L’équipe AssetHub reçoit votre dossier, vérifie les informations clés et vous contacte
              sous 24h pour finaliser la mise en ligne.
            </p>
            <div className="success-steps">
              <span><Check size={15} /> Dossier enregistré</span>
              <span><Phone size={15} /> Appel agent sous 24h</span>
              <span><BadgeCheck size={15} /> Qualification avant publication</span>
            </div>
            <button className="primary-action large" type="button" onClick={onReset}>
              <Plus size={18} />
              Publier un autre actif
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page-band seller-page">
      <div className="content-wrap seller-layout">
        <div className="seller-intro">
          <span className="section-kicker">Vendeur</span>
          <h2>Publier un actif qualifié, sans frais de mise en ligne.</h2>
          <p>
            La publication est gratuite. AssetHub facture 3% uniquement si la vente est conclue,
            avec paiement sécurisé avant livraison.
          </p>
          <div className="seller-rules">
            <span><ShieldCheck size={16} /> Mandat 60 jours</span>
            <span><Landmark size={16} /> Séquestre bancaire</span>
            <span><Scale size={16} /> Convention OHADA</span>
          </div>
        </div>

        <form className="seller-form" onSubmit={onSubmit}>
          <div className="form-section">
            <div className="form-title">
              <span>1</span>
              <strong>Informations sur l’actif</strong>
            </div>
            <label>
              Nom de l’actif
              <input required name="assetName" maxLength={100} placeholder="Groupe électrogène SDMO 50 kVA" />
            </label>
            <div className="form-grid">
              <label>
                Secteur
                <select required name="sector" defaultValue="">
                  <option value="" disabled>Choisir un secteur</option>
                  {sectorFilters
                    .filter((sector) => sector.key !== 'all')
                    .map((sector) => <option key={sector.key}>{sector.label}</option>)}
                </select>
              </label>
              <label>
                État général
                <select required name="condition" defaultValue="">
                  <option value="" disabled>Choisir l’état</option>
                  <option>Très bon état</option>
                  <option>Bon état</option>
                  <option>État correct</option>
                  <option>À remettre en état</option>
                </select>
              </label>
            </div>
            <div className="form-grid">
              <label>
                Marque / modèle
                <input name="brand" placeholder="Toyota, SDMO, John Deere..." />
              </label>
              <label>
                Localisation
                <select required name="location" defaultValue="">
                  <option value="" disabled>Ville principale</option>
                  <option>Yaoundé</option>
                  <option>Douala</option>
                  <option>Bafoussam</option>
                  <option>Garoua</option>
                  <option>Kribi</option>
                </select>
              </label>
            </div>
            <label>
              Description détaillée
              <textarea required name="description" maxLength={1000} placeholder="Caractéristiques, historique d’utilisation, état précis, accessoires inclus..." />
            </label>
            <button className="upload-zone" type="button">
              <Upload size={22} />
              <span>
                <strong>Ajouter des photos</strong>
                JPG ou PNG, jusqu’à 5 images
              </span>
            </button>
          </div>

          <div className="form-section">
            <div className="form-title">
              <span>2</span>
              <strong>Prix et transaction</strong>
            </div>
            <div className="form-grid">
              <label>
                Prix souhaité en FCFA
                <input
                  min={100000}
                  required
                  name="price"
                  type="number"
                  value={price}
                  onChange={(event) => onPriceChange(event.target.value)}
                  placeholder="5000000"
                />
              </label>
              <label>
                Négociation
                <select defaultValue="Prix à discuter">
                  <option>Prix à discuter</option>
                  <option>Prix ferme</option>
                  <option>Offres à partir de</option>
                </select>
              </label>
            </div>
            <div className="commission-box">
              <div>
                <span>Prix de vente</span>
                <strong>{priceValue ? formatCurrency(priceValue) : '—'}</strong>
              </div>
              <div>
                <span>Commission 3%</span>
                <strong>{priceValue ? formatCurrency(commission) : '—'}</strong>
              </div>
              <div>
                <span>Vous recevez</span>
                <strong>{priceValue ? formatCurrency(priceValue - commission) : '—'}</strong>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-title">
              <span>3</span>
              <strong>Coordonnées du vendeur</strong>
            </div>
            <div className="form-grid">
              <label>
                Nom ou raison sociale
                <input required name="fullName" placeholder="Entreprise ou représentant" />
              </label>
              <label>
                Fonction
                <input name="company" placeholder="DG, DAF, responsable logistique..." />
              </label>
            </div>
            <div className="form-grid">
              <label>
                Téléphone WhatsApp
                <input required name="phone" type="tel" placeholder="(+237) 688 717 889 / 677 177 890 / 699 688 665" />
              </label>
              <label>
                Email professionnel
                <input required name="email" type="email" placeholder="contact@entreprise.cm" />
              </label>
            </div>
            <label className="check-field">
              <input required type="checkbox" />
              <span>Je certifie être propriétaire ou mandataire autorisé pour céder cet actif.</span>
            </label>
            <label className="check-field">
              <input required type="checkbox" />
              <span>J’accepte le mandat de vente exclusif de 60 jours et la commission de 3% à la vente.</span>
            </label>
          </div>

          <button className="primary-action submit-action" type="submit">
            <Send size={18} />
            Soumettre l’actif gratuitement
          </button>
        </form>
      </div>
    </section>
  )
}