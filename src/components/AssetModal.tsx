import { CheckCircle2, Landmark, Scale, Send, UserRound, X } from 'lucide-react'
import { DetailItem } from './DetailItem'
import { formatCurrency } from '../utils/currency'
import type { Asset, FormSubmitHandler } from '../types/marketplace'

type AssetModalProps = {
  asset: Asset
  deposit: number
  offerAmount: string
  offerSent: boolean
  offerValue: number
  onClose: () => void
  onOfferAmountChange: (amount: string) => void
  onOfferSubmit: FormSubmitHandler
}

export function AssetModal({
  asset,
  deposit,
  offerAmount,
  offerSent,
  offerValue,
  onClose,
  onOfferAmountChange,
  onOfferSubmit,
}: AssetModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <section className="asset-modal" onClick={(event) => event.stopPropagation()} aria-modal="true" role="dialog">
        <div className="modal-header">
          <div>
            <span>{asset.sector}</span>
            <h2>{asset.name}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-visual">
            <img src={asset.image} alt={asset.name} />
          </div>
          <div className="modal-details">
            <div className="price-card">
              <span>Prix demandé</span>
              <strong>{formatCurrency(asset.price)}</strong>
              <small>Commission AssetHub estimée : {formatCurrency(Math.round(asset.price * 0.03))}</small>
            </div>
            <div className="detail-grid">
              <DetailItem label="Localisation" value={asset.location} />
              <DetailItem label="État" value={asset.condition} />
              <DetailItem label="Marque" value={asset.brand} />
              <DetailItem label="Usage" value={asset.usage} />
              <DetailItem label="Année" value={String(asset.year)} />
              <DetailItem label="Vendeur" value={asset.seller} />
            </div>
            <p className="modal-description">{asset.description}</p>
            <div className="security-row">
              <span><Landmark size={15} /> Séquestre</span>
              <span><Scale size={15} /> OHADA</span>
              <span><UserRound size={15} /> Agent terrain</span>
            </div>
          </div>
        </div>

        {offerSent ? (
          <div className="offer-success-box">
            <CheckCircle2 size={36} />
            <h3>Offre envoyée</h3>
            <p>Un agent AssetHub vous contacte pour organiser l’acompte et la visite terrain.</p>
          </div>
        ) : (
          <form className="offer-form" onSubmit={onOfferSubmit}>
            <div className="offer-form-head">
              <strong>Faire une offre</strong>
              <span>Acompte de réservation estimé à 10%</span>
            </div>
            <div className="form-grid">
              <label>
                Nom / entreprise
                <input required name="buyerName" placeholder="Votre nom" />
              </label>
              <label>
                WhatsApp
                <input required name="buyerPhone" type="tel" placeholder="(+237) 688 717 889 / 677 177 890 / 699 688 665" />
              </label>
            </div>
            <label>
              Email
              <input required name="buyerEmail" type="email" placeholder="acheteur@entreprise.cm" />
            </label>
            <label>
              Montant proposé
              <input
                min={100000}
                required
                name="amount"
                type="number"
                value={offerAmount}
                onChange={(event) => onOfferAmountChange(event.target.value)}
              />
            </label>
            <div className="offer-summary">
              <span>Offre : <strong>{formatCurrency(offerValue)}</strong></span>
              <span>Acompte : <strong>{formatCurrency(deposit)}</strong></span>
              <span>Solde : <strong>{formatCurrency(offerValue - deposit)}</strong></span>
            </div>
            <button className="primary-action submit-action" type="submit">
              <Send size={17} />
              Envoyer l’offre
            </button>
          </form>
        )}
      </section>
    </div>
  )
}