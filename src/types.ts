// Types for AgroIO Landing Page

export interface FeatureCardProps {
  icon?: string;
  imageUrl?: string;
  title: string;
  description: string;
}

export interface StepProps {
  number: string;
  title: string;
  description: string;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'white';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface SocialLinkProps {
  href: string;
  icon: 'twitter' | 'instagram' | 'linkedin';
}

export interface FooterLinkGroupProps {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

// Agricultural Product Types
export type ProductCategory =
  | 'solanacee'
  | 'cucurbitacee'
  | 'brassicacee'
  | 'asteracee'
  | 'amarantacee'
  | 'ombrellifere'
  | 'liliacee'
  | 'leguminose'
  | 'cereali'
  | 'lamiacee'
  | 'rosacee'
  | 'funghi'
  | 'caprifoliaceae'
  | 'asparagaceae'
  | 'boraginaceae'
  | 'portulacaceae'
  | 'polygonaceae'
  | 'zingiberaceae'
  | 'ericaceae'
  | 'grossulariaceae'
  | 'altre';

export interface AgricultureProduct {
  id: string;
  name: string;
  scientificName: string;
  category: ProductCategory;
  image: string;
  description: string;

  // Cultivation info
  sowingPeriod: string; // e.g., "Feb-Mar", "Tutto anno"
  harvestPeriod: string; // e.g., "Lug-Ott"
  germinationDays: string; // e.g., "7-10", "15-20"
  harvestDays: string; // e.g., "60-80", "Lungo"

  // Growing conditions
  sunExposure: 'pieno-sole' | 'mezz-ombra' | 'ombra';
  waterNeeds: 'basso' | 'medio' | 'alto' | 'molto-alto';
  soilType: string;
  soilPH: string; // e.g., "6-7", "5.5-7.2"
  temperatureMin: number;
  temperatureMax: number;
  temperatureIdeal: string; // e.g., "20-25", "15-20"

  // Spacing
  rowDistance: string; // cm, can be range "40-60"
  plantDistance: string; // cm, can be range "40-60"
  sowingDepth: string; // cm, can be range "0.5-1"

  // Companion planting
  goodCompanions: string[];
  badCompanions: string[];

  // Environment suitability
  suitableFor: string[]; // More flexible: "Orto", "Serra", "Vaso", "Balcone", "Campo", etc.
  difficulty: 'facile' | 'medio' | 'difficile';

  // Additional info
  diseases: string[];
  notes: string; // Important cultivation notes
}

export interface ProductCardProps {
  product: AgricultureProduct;
  onClick?: (product: AgricultureProduct) => void;
  onAddToGarden?: (product: AgricultureProduct, e: React.MouseEvent) => void;
}

export interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

// Seedling (Semenzaio) Types
export interface SeedlingEntry {
  id: string;
  productId: string;
  productName: string;
  variety: string;
  scientificName: string;
  image: string;
  sowingDate: string; // ISO date string
  germinationDate?: string; // ISO date string
  transplantDate?: string; // ISO date string
  quantity: number; // number of cells/containers
  containerType: string; // e.g., "Vassoio 45 alveoli", "Vassoio 104 alveoli"
  status: 'semina' | 'germinazione' | 'sviluppo' | 'pronto-trapianto' | 'trapiantato';
  notes: string;
  // Environmental conditions
  temperature: number; // current temperature in °C
  humidity: number; // humidity percentage
  lightHours: number; // hours of light per day
}

export interface SeedlingRecommendation {
  // Position and structure
  position: 'sud' | 'sud-ovest' | 'sud-est' | 'est' | 'ovest';
  structureType: 'serra' | 'semenzaio-riscaldato' | 'semenzaio-freddo' | 'indoor';

  // Temperature requirements
  temperatureMin: number; // °C
  temperatureMax: number; // °C
  temperatureIdeal: string; // e.g., "18-25"
  requiresHeating: boolean;

  // Lighting requirements
  lightType: 'naturale' | 'artificiale' | 'mista';
  lightHoursMin: number;
  lightHoursIdeal: number;

  // Substrate/Soil
  substrateComposition: string; // e.g., "25% torba nera, 75% torbe brune/bionde"
  phMin: number;
  phMax: number;
  drainage: 'basso' | 'medio' | 'alto';

  // Container
  containerType: string; // e.g., "Vassoio 45 alveoli (55x55cm)"
  cellSize: string; // e.g., "5x5cm"

  // Irrigation
  irrigationType: 'nebulizzatore' | 'pioggia-fine' | 'manuale';
  wateringFrequency: string; // e.g., "Quotidiana", "2 volte al giorno"

  // Ventilation
  ventilationNeeded: boolean;
  ventilationType: 'manuale' | 'automatica';

  // General notes
  criticalNotes: string[];
}

export interface SeedlingConditions {
  temperature: number; // °C
  humidity: number; // %
  lightHours: number;
  ventilationActive: boolean;
  lastWatering: string; // ISO date string
}
