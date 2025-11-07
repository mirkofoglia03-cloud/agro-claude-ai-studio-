
import { useState, useCallback, useEffect } from 'react';
import type { WeatherDay } from './types';
import { fetchMockWeather } from './services';

// Custom hook for weather data management
export const useWeather = (appState: string) => {
  const [weatherData, setWeatherData] = useState<WeatherDay[] | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLocation({ lat, lon });
    setWeatherLoading(true);
    try {
      const data = await fetchMockWeather(lat, lon);
      setWeatherData(data);
      setWeatherError(null);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setWeatherError('Impossibile caricare i dati meteo. Per favore, riprova più tardi.');
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  useEffect(() => {
    if (appState !== 'loggedIn') return;
    
    // Simulate geolocation check for a more realistic flow
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setWeatherError('Geolocalizzazione non riuscita. Verrà mostrato il meteo per Roma.');
          fetchWeather(41.9028, 12.4964); // Fallback to Rome
        }
      );
    } else {
      setWeatherError('La geolocalizzazione non è supportata. Verrà mostrato il meteo per Roma.');
      fetchWeather(41.9028, 12.4964); // Fallback to Rome
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  return { weatherData, weatherLoading, weatherError, location };
};

// Custom hook for weather notifications
export const useWeatherNotifications = (weatherData: WeatherDay[] | null) => {
  useEffect(() => {
    if (!weatherData || weatherData.length === 0) return;
    
    // Check if Notification API is available and permission is granted
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log("Notification permission granted.");
                }
            });
        }
        return;
    }
    
    const todayWeather = weatherData[0];
    const todayDate = new Date().toISOString().split('T')[0];

    const HEAVY_RAIN_THRESHOLD = 70;
    const STRONG_WIND_THRESHOLD = 35;

    const rainAlertKey = `alert_rain_${todayDate}`;
    if (todayWeather.rainChance > HEAVY_RAIN_THRESHOLD && !sessionStorage.getItem(rainAlertKey)) {
      console.log('SIMULATING NOTIFICATION: Heavy Rain Alert');
      new Notification('AgroIO - Allerta Pioggia Forte', {
        body: `Attenzione: prevista alta probabilità di pioggia (${todayWeather.rainChance}%) oggi. Considera di proteggere le colture sensibili.`,
        tag: 'weather-alert-rain',
      });
      sessionStorage.setItem(rainAlertKey, 'true');
    }
    
    const windAlertKey = `alert_wind_${todayDate}`;
    if (todayWeather.wind > STRONG_WIND_THRESHOLD && !sessionStorage.getItem(windAlertKey)) {
      console.log('SIMULATING NOTIFICATION: Strong Wind Alert');
      new Notification('AgroIO - Allerta Vento Forte', {
        body: `Attenzione: previsto vento forte (${todayWeather.wind} km/h) oggi. Assicura le strutture e le coperture.`,
        tag: 'weather-alert-wind',
      });
      sessionStorage.setItem(windAlertKey, 'true');
    }
  }, [weatherData]);
};
