import React from 'react';
import { Link } from 'react-router-dom';

const CalendarPage: React.FC = (): JSX.Element => {
  const months = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  return (
    <div className="min-h-screen bg-agro-cream pt-6 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-agro-green-dark mb-4">
            Calendario di Semina
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pianifica le tue semine in base al microclima della tua zona
          </p>
        </div>

        {/* Calendar Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-agro-green-dark">Anno 2025</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {months.map((month) => (
              <div
                key={month}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-agro-lime hover:shadow-md transition cursor-pointer"
              >
                <h3 className="font-bold text-agro-green-dark mb-2">{month}</h3>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">Semine: --</p>
                  <p>Raccolti: --</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-agro-green/10 p-3 rounded-xl">
                <svg className="w-8 h-8 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Calendario Personalizzato</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600">
              Il calendario si adatta automaticamente al microclima della tua zona, suggerendo i periodi ottimali per ogni coltura in base a temperatura, umidità e stagionalità locale.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Promemoria Automatici</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600">
              Ricevi notifiche per non dimenticare le date di semina, trapianto, concimazione e raccolta. Tutto sincronizzato con le previsioni meteo.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Consociazioni Ottimali</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600">
              Il sistema suggerisce automaticamente le migliori combinazioni di piante da seminare insieme, massimizzando lo spazio e migliorando la resa.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Rotazione Colture</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600">
              Pianifica la rotazione delle colture per mantenere il terreno fertile e prevenire malattie, con suggerimenti automatici basati sulla storia del tuo orto.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-agro-green to-agro-lime rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Funzionalità in Arrivo</h2>
          <p className="text-lg mb-6">
            Il calendario dinamico sarà presto disponibile. Nel frattempo, esplora il nostro database completo!
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-agro-green px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
