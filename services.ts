
import type { WeatherDay, TaskSuggestion, SubscriptionPlan } from './types';
import { SubscriptionPlan as Plan } from './types';

// =================================================================
// MOCK WEATHER SERVICE
// =================================================================
const mockWeatherData: WeatherDay[] = [
  { day: 'Oggi', temp: 28, tempMin: 18, condition: 'Sunny', wind: 15, humidity: 60, rainChance: 10 },
  { day: 'Domani', temp: 26, tempMin: 17, condition: 'Cloudy', wind: 20, humidity: 70, rainChance: 40 },
  { day: 'Mer', temp: 24, tempMin: 16, condition: 'Rain', wind: 25, humidity: 85, rainChance: 90 },
  { day: 'Gio', temp: 27, tempMin: 18, condition: 'Sunny', wind: 12, humidity: 55, rainChance: 5 },
  { day: 'Ven', temp: 29, tempMin: 19, condition: 'Sunny', wind: 10, humidity: 50, rainChance: 0 },
  { day: 'Sab', temp: 25, tempMin: 17, condition: 'Windy', wind: 35, humidity: 65, rainChance: 30 },
  { day: 'Dom', temp: 26, tempMin: 18, condition: 'Cloudy', wind: 18, humidity: 75, rainChance: 20 },
];

export const fetchMockWeather = (lat: number, lon: number): Promise<WeatherDay[]> => {
  console.log(`Fetching mock weather for lat: ${lat}, lon: ${lon}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData);
    }, 1000);
  });
};

// =================================================================
// SUGGESTION GENERATOR
// =================================================================
export const generateTaskSuggestions = (weatherData: WeatherDay[]): TaskSuggestion[] => {
  const suggestions: TaskSuggestion[] = [];
  const today = weatherData[0];

  if (today.condition === 'Rain' && today.rainChance > 80) {
    suggestions.push({
      id: 's1',
      text: 'Controllare il drenaggio',
      category: 'Manutenzione',
      reason: 'Le forti piogge di oggi potrebbero causare ristagni d\'acqua.'
    });
  }
  if (today.condition === 'Windy' && today.wind > 30) {
    suggestions.push({
      id: 's2',
      text: 'Assicurare sostegni e coperture',
      category: 'Protezione',
      reason: `Il vento forte a ${today.wind} km/h previsto per oggi potrebbe danneggiare le piante.`
    });
  }
  if (today.condition === 'Sunny' && today.temp > 28) {
    suggestions.push({
      id: 's3',
      text: 'Annaffiare abbondantemente',
      category: 'Irrigazione',
      reason: 'Le alte temperature e il sole richiedono più acqua per le piante.'
    });
  }
  if (weatherData.some(day => day.condition === 'Rain')) {
     suggestions.push({
      id: 's4',
      text: 'Pianificare la raccolta dell\'acqua piovana',
      category: 'Pianificazione',
      reason: 'Prevista pioggia nei prossimi giorni, un\'ottima opportunità per raccogliere acqua.'
    });
  }

  return suggestions.slice(0, 3); // Return max 3 suggestions
};

// =================================================================
// UTILITY FUNCTIONS
// =================================================================
export const isFeatureAllowed = (requiredPlan: SubscriptionPlan, userPlan: SubscriptionPlan): boolean => {
  const planHierarchy = {
    [Plan.HOBBY]: 1,
    [Plan.PRO]: 2,
    [Plan.BUSINESS]: 3,
  };
  return planHierarchy[userPlan] >= planHierarchy[requiredPlan];
};
