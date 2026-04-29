import {
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Hammer,
  Hotel,
  Landmark,
  Search,
  Send,
  Server,
  SlidersHorizontal,
  Tractor,
  Truck,
  UserRound,
  Users,
  Zap,
} from 'lucide-react'
import type { Asset, NavItem, ProcessStep, SectorOption } from '../types/marketplace'

export const navItems: NavItem[] = [
  { page: 'home', label: 'Accueil' },
  { page: 'catalog', label: 'Catalogue' },
  { page: 'seller', label: 'Vendre' },
  { page: 'how', label: 'Fonctionnement' },
  { page: 'about', label: 'À propos' },
]

export const sectorFilters: SectorOption[] = [
  { key: 'all', label: 'Tous', icon: SlidersHorizontal },
  { key: 'Énergie', label: 'Énergie', icon: Zap },
  { key: 'BTP', label: 'BTP', icon: Hammer },
  { key: 'Transport', label: 'Transport', icon: Truck },
  { key: 'Agriculture', label: 'Agriculture', icon: Tractor },
  { key: 'IT', label: 'IT', icon: Server },
  { key: 'Hôtellerie', label: 'Hôtellerie', icon: Hotel },
]

export const assets: Asset[] = [
  {
    id: 1,
    name: 'Groupe électrogène SDMO 50 kVA',
    sector: 'Énergie',
    price: 8500000,
    location: 'Yaoundé',
    year: 2019,
    condition: 'Bon état',
    brand: 'SDMO',
    usage: '3 000h',
    seller: 'Entreprise industrielle',
    description:
      'Groupe électrogène diesel 50 kVA avec carnet d’entretien, réservoir 200L, maintenance moteur réalisée et disponibilité immédiate pour site professionnel.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
    accent: '#fff7e8',
    urgent: true,
    certified: true,
    tags: ['Inspection requise', 'Carnet disponible'],
  },
  {
    id: 2,
    name: 'Kit solaire hybride 5 kWc complet',
    sector: 'Énergie',
    price: 3200000,
    location: 'Yaoundé',
    year: 2021,
    condition: 'Très bon état',
    brand: 'Longi / Pylontech',
    usage: 'Moins de 500 cycles',
    seller: 'Installateur solaire certifié',
    description:
      'Dix panneaux monocristallins, quatre batteries lithium, coffret de protection et câblage complet. Déposé suite à reconfiguration de site.',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
    accent: '#fffbe9',
    urgent: false,
    certified: true,
    tags: ['Garantie partielle', 'Très demandé'],
  },
  {
    id: 3,
    name: 'Compacteur à plaque Weber CF2',
    sector: 'BTP',
    price: 1800000,
    location: 'Douala',
    year: 2018,
    condition: 'Bon état',
    brand: 'Weber',
    usage: '400h',
    seller: 'PME BTP camerounaise',
    description:
      'Compacteur 80 kg, moteur Honda GX160, révision récente et courroie remplacée. Adapté aux travaux de terrassement et voirie légère.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
    accent: '#eef7ff',
    urgent: false,
    certified: false,
    tags: ['Essai sur site', 'Prix négociable'],
  },
  {
    id: 4,
    name: 'Camion benne Iveco Daily 35C15',
    sector: 'Transport',
    price: 12000000,
    location: 'Yaoundé',
    year: 2017,
    condition: 'État correct',
    brand: 'Iveco',
    usage: '180 000 km',
    seller: 'Société de logistique',
    description:
      'Camion benne 3,5T avec révision complète effectuée, boîte manuelle, carte grise disponible et usage adapté aux matériaux de chantier.',
    image:
      'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=900&q=80',
    accent: '#f1f5ff',
    urgent: true,
    certified: true,
    tags: ['Documents vérifiés', 'Visite prioritaire'],
  },
  {
    id: 5,
    name: 'Tracteur John Deere 5075E',
    sector: 'Agriculture',
    price: 18500000,
    location: 'Bafoussam',
    year: 2016,
    condition: 'Bon état',
    brand: 'John Deere',
    usage: '2 800h moteur',
    seller: 'Coopérative agricole Ouest',
    description:
      'Tracteur 75 CV avec cabine fermée climatisée, relevage hydraulique, prise de force et historique d’entretien chez concessionnaire agréé.',
    image:
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=900&q=80',
    accent: '#eef9ef',
    urgent: false,
    certified: true,
    tags: ['Expertise disponible', 'Option accessoires'],
  },
  {
    id: 6,
    name: 'Onduleur hybride DEYE 15 kW triphasé',
    sector: 'Énergie',
    price: 2100000,
    location: 'Yaoundé',
    year: 2022,
    condition: 'Très bon état',
    brand: 'DEYE',
    usage: 'Moins de 200h',
    seller: 'Clean Energy Services SARL',
    description:
      'Onduleur triphasé compatible batteries lithium et plomb, manuel fourni, très faible utilisation et garantie constructeur encore active.',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
    accent: '#f6f0ff',
    urgent: false,
    certified: true,
    tags: ['Faible usage', 'Garantie active'],
  },
  {
    id: 7,
    name: 'Toyota Land Cruiser 200 V8',
    sector: 'Transport',
    price: 22000000,
    location: 'Yaoundé',
    year: 2019,
    condition: 'Très bon état',
    brand: 'Toyota',
    usage: '95 000 km',
    seller: 'ONG internationale',
    description:
      'Véhicule 7 places full options, carnet Toyota complet, différentiel verrouillable et disponibilité liée à la clôture d’un programme humanitaire.',
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
    accent: '#fff3e8',
    urgent: true,
    certified: true,
    tags: ['Carnet Toyota', 'Forte demande'],
  },
]

export const sellerSteps: ProcessStep[] = [
  { title: 'Publication', detail: 'Annonce gratuite, structurée et vérifiée sous 24h.', icon: ClipboardCheck },
  { title: 'Qualification', detail: 'Agent terrain, photos, documents et prix cohérent.', icon: UserRound },
  { title: 'Négociation', detail: 'Offres filtrées, identité protégée et visite organisée.', icon: Users },
  { title: 'Séquestre', detail: 'Paiement sécurisé avant livraison et PV de remise.', icon: Landmark },
]

export const buyerSteps: ProcessStep[] = [
  { title: 'Recherche', detail: 'Catalogue filtré par secteur, budget et localisation.', icon: Search },
  { title: 'Offre', detail: 'Acompte de réservation et prise de rendez-vous encadrée.', icon: Send },
  { title: 'Contrôle', detail: 'Inspection, rapport technique et documents de cession.', icon: BadgeCheck },
  { title: 'Livraison', detail: 'Signature du PV puis déblocage des fonds au vendeur.', icon: CheckCircle2 },
]

export const trustedCompanies = [
  { name: 'Clean Energy Services', logoKey: 'clean-energy-services' },
  { name: 'Coopérative Agricole Ouest' },
  { name: 'Centre Logistique Yaoundé' },
  { name: 'BTP Littoral Services' },
  { name: 'Réseau PME Énergie' },
  { name: 'Hôtellerie Pro Cameroun' },
]

export const testimonials = [
  {
    quote:
      'AssetHub nous a permis de valoriser un actif immobilisé sans exposer directement nos équipes commerciales. La qualification terrain a fait la différence.',
    author: 'Amina T.',
    role: 'Directrice administrative, énergie',
    metric: 'Actif qualifié en 24h',
  },
  {
    quote:
      'Le séquestre et le procès-verbal de remise ont rassuré notre comité d’achat. Le processus est plus clair qu’une vente informelle classique.',
    author: 'Fabrice M.',
    role: 'Responsable opérations, BTP',
    metric: 'Offre suivie par agent',
  },
  {
    quote:
      'Nous avons trouvé un équipement agricole adapté à notre budget, avec un dossier complet et une visite organisée avant engagement.',
    author: 'Clarisse N.',
    role: 'Gestionnaire de coopérative',
    metric: 'Transaction encadrée',
  },
]