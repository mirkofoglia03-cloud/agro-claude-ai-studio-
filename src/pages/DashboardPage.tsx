import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-agro-cream pt-6 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-agro-green-dark mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Panoramica completa delle tue colture e attività agricole
          </p>
        </div>

        {/* Feature Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-agro-green/10 p-3 rounded-xl">
                <svg className="w-8 h-8 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark">Statistiche Rapide</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Visualizza a colpo d'occhio tutte le metriche importanti delle tue colture: numero di piante, resa prevista, consumi idrici.
            </p>
          </div>

          {/* Active Crops */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-agro-lime/20 p-3 rounded-xl">
                <svg className="w-8 h-8 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark">Colture Attive</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Gestisci le colture attualmente in corso: stato di crescita, giorni alla raccolta, azioni necessarie.
            </p>
          </div>

          {/* Weather Integration */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark">Meteo & Radar</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Previsioni meteo localizzate e dati dal radar installato per calcoli precisi di irrigazione.
            </p>
          </div>

          {/* Tasks & Reminders */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark">Attività & Promemoria</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Lista delle attività da fare: concimazioni, trattamenti, raccolta. Ricevi promemoria automatici.
            </p>
          </div>

          {/* Yield Tracking */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark">Tracciamento Raccolta</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Registra la resa di ogni coltura, confronta con le previsioni e ottimizza le prossime semine.
            </p>
          </div>

          {/* Resource Management */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark">Gestione Risorse</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Monitora consumo idrico, fertilizzanti, sementi e altri materiali per ottimizzare i costi.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-agro-green to-agro-lime rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Funzionalità in Arrivo</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Stiamo lavorando per portarti la migliore esperienza di gestione agricola.
            Torna alla home per esplorare il database dei prodotti già disponibile!
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

export default DashboardPage;
