import React, { useState } from 'react';

const MapPage: React.FC = (): JSX.Element => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [coordinates] = useState({ lat: 41.9028, lng: 12.4964 }); // Rome default

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In una implementazione reale, qui si farebbe geocoding dell'indirizzo
    console.log('Searching for:', selectedLocation);
  };

  return (
    <div className="min-h-screen bg-agro-cream pt-6 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-agro-green-dark mb-4">
            Mappa Terreni
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visualizza e gestisci le tue aree di coltivazione
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleLocationSearch} className="flex gap-4">
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Cerca indirizzo o coordinate..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-agro-green to-agro-lime text-white font-bold rounded-xl hover:shadow-lg transition"
            >
              Cerca
            </button>
          </form>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-agro-green to-agro-lime p-4 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Visualizzazione Mappa</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition text-sm">
                  Satellite
                </button>
                <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition text-sm">
                  Terreno
                </button>
              </div>
            </div>
          </div>

          {/* Map Placeholder - Può essere sostituito con Leaflet, Google Maps, etc. */}
          <div className="relative w-full h-[600px] bg-gray-100">
            <iframe
              title="Mappa Terreni"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng-0.1}%2C${coordinates.lat-0.1}%2C${coordinates.lng+0.1}%2C${coordinates.lat+0.1}&layer=mapnik&marker=${coordinates.lat}%2C${coordinates.lng}`}
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* Map Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Area Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-agro-green/10 p-3 rounded-xl">
                <svg className="w-8 h-8 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Area Selezionata</h3>
                <p className="text-sm text-gray-500">Coordinate GPS</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Latitudine:</span>
                <span className="font-semibold">{coordinates.lat.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Longitudine:</span>
                <span className="font-semibold">{coordinates.lng.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Superficie:</span>
                <span className="font-semibold">-- m²</span>
              </div>
            </div>
          </div>

          {/* Drawing Tools */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Strumenti Disegno</h3>
                <p className="text-sm text-gray-500">Delimita le zone</p>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-agro-lime hover:bg-agro-green/5 transition text-left text-sm">
                <span className="mr-2">📍</span> Aggiungi Marker
              </button>
              <button className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-agro-lime hover:bg-agro-green/5 transition text-left text-sm">
                <span className="mr-2">▭</span> Disegna Area
              </button>
              <button className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-agro-lime hover:bg-agro-green/5 transition text-left text-sm">
                <span className="mr-2">📏</span> Misura Distanza
              </button>
            </div>
          </div>

          {/* Saved Locations */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Posizioni Salvate</h3>
                <p className="text-sm text-gray-500">I tuoi terreni</p>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-agro-green/5 border-2 border-agro-green/20 rounded-lg hover:border-agro-lime transition text-left text-sm">
                <div className="font-semibold text-agro-green-dark">Terreno Principale</div>
                <div className="text-xs text-gray-500">500 m²</div>
              </button>
              <button className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-agro-lime hover:bg-agro-green/5 transition text-center text-sm text-agro-green font-semibold">
                + Aggiungi Terreno
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
