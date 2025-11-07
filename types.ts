
export enum SubscriptionPlan {
  HOBBY = 'Hobby',
  PRO = 'Pro',
  BUSINESS = 'Business',
}

export interface NavItem {
  name: NavItemType;
  icon: React.ComponentType<{ className?: string }>;
  plan: SubscriptionPlan;
}

export type NavItemType = 
  | 'Il mio Orto' 
  | 'I miei ortaggi' 
  | 'Check List' 
  | 'Meteo' 
  | 'Progetta il tuo Orto' 
  | 'Il tuo AgroGiardiniere' 
  | 'Entrate/Uscite' 
  | 'Raccolti' 
  | 'Community' 
  | 'E-Commerce' 
  | 'Faq'
  | 'Upgrade';

export interface WeatherDay {
  day: string;
  temp: number;
  tempMin: number;
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Windy';
  wind: number;
  humidity: number;
  rainChance: number;
}

export interface TaskSuggestion {
  id: string;
  text: string;
  category: string;
  reason: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  lat: number;
  lng: number;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Bassa' | 'Media' | 'Alta';
}
