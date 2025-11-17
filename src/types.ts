// Types for AgroIO Landing Page

export interface FeatureCardProps {
  icon: string;
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
export interface AgricultureProduct {
  id: string;
  name: string;
  scientificName: string;
  category: 'ortaggi' | 'frutta' | 'erbe-aromatiche' | 'legumi';
  image: string;
  emoji: string;
  description: string;

  // Cultivation info
  sowingPeriod: {
    start: string; // Month name
    end: string;
  };
  harvestPeriod: {
    start: string;
    end: string;
  };
  germinationDays: number;
  harvestDays: number; // Days from sowing to harvest

  // Growing conditions
  sunExposure: 'pieno-sole' | 'mezz-ombra' | 'ombra';
  waterNeeds: 'basso' | 'medio' | 'alto';
  soilType: string[];
  idealTemperature: {
    min: number;
    max: number;
  };

  // Spacing
  rowDistance: number; // cm
  plantDistance: number; // cm
  sowingDepth: number; // cm

  // Companion planting
  goodCompanions: string[];
  badCompanions: string[];

  // Environment suitability
  suitableFor: ('vaso' | 'balcone' | 'orto' | 'serra' | 'campo-aperto')[];
  difficulty: 'facile' | 'medio' | 'difficile';

  // Additional info
  tips: string[];
  diseases: string[];
  nutritionalInfo?: string;
}

export interface ProductCardProps {
  product: AgricultureProduct;
  onClick?: (product: AgricultureProduct) => void;
}

export interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
