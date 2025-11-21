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
