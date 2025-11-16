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
