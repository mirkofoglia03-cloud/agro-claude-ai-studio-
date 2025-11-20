import React, { useState } from 'react';

const WeatherPage: React.FC = (): JSX.Element => {
  const [selectedCity, setSelectedCity] = useState('Roma');

  const currentWeather = {
    temperature: 22,
    condition: 'Soleggiato',
    humidity: 65,
    wind: 12,
    precipitation: 10,
    uvIndex: 6,
  };

  const weeklyForecast = [
    { day: 'Lun', temp: '20°/12°', condition: '☀️', rain: '0%' },
    { day: 'Mar', temp: '22°/14°', condition: '⛅', rain: '10%' },
    { day: 'Mer', temp: '19°/13°', condition: '🌧️', rain: '70%' },
    { day: 'Gio', temp: '21°/15°', condition: '⛅', rain: '20%' },
    { day: 'Ven', temp: '23°/16°', condition: '☀️', rain: '0%' },
    { day: 'Sab', temp: '24°/17°', condition: '☀️', rain: '5%' },
    { day: 'Dom', temp: '22°/15°', condition: '⛅', rain: '15%' },
  ];

  const recommendations = [
    { icon: '💧', title: 'Irrigazione', desc: 'Consigliata domani mattina', color: 'bg-blue-100 text-blue-800' },
    { icon: '🌱', title: 'Semina', desc: 'Condizioni ideali mercoledì', color: 'bg-green-100 text-green-800' },
    { icon: '⚠️', title: 'Allerta', desc: 'Pioggia prevista mercoledì', color: 'bg-yellow-100 text-yellow-800' },
  ];

  return (
    <div className="min-h-screen bg-agro-cream pt-6 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-agro-green-dark mb-4">
            Meteo & Radar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Previsioni meteorologiche per ottimizzare le tue colture
          </p>
        </div>

        {/* Location Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
            >
              <option value="Roma">Roma</option>
              <option value="Milano">Milano</option>
              <option value="Napoli">Napoli</option>
              <option value="Torino">Torino</option>
              <option value="Firenze">Firenze</option>
            </select>
            <button className="px-6 py-3 bg-gradient-to-r from-agro-green to-agro-lime text-white font-bold rounded-xl hover:shadow-lg transition">
              Aggiorna
            </button>
          </div>
        </div>

        {/* Current Weather Card */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-8 mb-6 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{selectedCity}</h2>
              <p className="text-white/80">Condizioni Attuali</p>
            </div>
            <div className="text-6xl">☀️</div>
          </div>
          <div className="flex items-end gap-4 mb-6">
            <div className="text-7xl font-bold">{currentWeather.temperature}°</div>
            <div className="text-2xl mb-4">{currentWeather.condition}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <div className="text-white/70 text-sm mb-1">Umidità</div>
              <div className="text-2xl font-bold">{currentWeather.humidity}%</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <div className="text-white/70 text-sm mb-1">Vento</div>
              <div className="text-2xl font-bold">{currentWeather.wind} km/h</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <div className="text-white/70 text-sm mb-1">Precipitazioni</div>
              <div className="text-2xl font-bold">{currentWeather.precipitation}%</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <div className="text-white/70 text-sm mb-1">Indice UV</div>
              <div className="text-2xl font-bold">{currentWeather.uvIndex}</div>
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-agro-green-dark mb-6">Previsioni Settimanali</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {weeklyForecast.map((day, index) => (
              <div
                key={index}
                className="bg-agro-cream rounded-xl p-4 text-center hover:shadow-lg transition"
              >
                <div className="font-bold text-agro-green-dark mb-2">{day.day}</div>
                <div className="text-4xl mb-2">{day.condition}</div>
                <div className="font-semibold text-gray-700 mb-2">{day.temp}</div>
                <div className="text-sm text-blue-600">💧 {day.rain}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Map */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-agro-green to-agro-lime p-4 text-white">
            <h2 className="text-xl font-bold">Radar Meteorologico</h2>
            <p className="text-sm text-white/80">Visualizzazione precipitazioni in tempo reale</p>
          </div>
          <div className="relative w-full h-[400px] bg-gray-100">
            {/* Placeholder per radar meteo - può essere integrato con API meteo reali */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌧️</div>
                <p className="text-gray-600 font-semibold">Radar Meteo</p>
                <p className="text-sm text-gray-500">Dati radar in arrivo...</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex justify-between items-center">
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-200 rounded"></div>
                <span>Leggera</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded"></div>
                <span>Moderata</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span>Intensa</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-agro-lime transition text-sm font-semibold">
              Aggiorna Radar
            </button>
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className={`inline-block text-3xl p-3 rounded-lg ${rec.color} mb-4`}>
                {rec.icon}
              </div>
              <h3 className="text-lg font-bold text-agro-green-dark mb-2">{rec.title}</h3>
              <p className="text-gray-600">{rec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
