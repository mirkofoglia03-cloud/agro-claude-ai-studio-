import React from 'react';
import { Link } from 'react-router-dom';

const MonitoringPage: React.FC = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-agro-cream pt-6 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-agro-green-dark mb-4">
            Monitoraggio Colture
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tieni sotto controllo lo stato di salute delle tue piante in tempo reale
          </p>
        </div>

        {/* Monitoring Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Growth Tracking */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-xl">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-agro-green-dark">Tracciamento Crescita</h3>
                <p className="text-gray-500">Dalla semina al raccolto</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Fase di Crescita</span>
                  <span className="text-sm text-gray-500">In sviluppo</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-agro-lime h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Monitora l'avanzamento di ogni coltura attraverso le diverse fasi: germinazione, crescita vegetativa, fioritura, fruttificazione e maturazione.
              </p>
            </div>
          </div>

          {/* Disease Prevention */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-100 p-4 rounded-xl">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-agro-green-dark">Prevenzione Malattie</h3>
                <p className="text-gray-500">Alert preventivi</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <p className="font-semibold text-red-800 mb-1">Alert Preventivi</p>
                <p className="text-sm text-red-600">
                  Nessun alert al momento - Funzionalità in sviluppo
                </p>
              </div>
              <p className="text-gray-600 text-sm">
                Ricevi avvisi preventivi basati su condizioni meteo, periodo dell'anno e colture presenti per prevenire malattie comuni.
              </p>
            </div>
          </div>

          {/* Weather Data */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-xl">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-agro-green-dark">Dati Meteo</h3>
                <p className="text-gray-500">Radar locale integrato</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Temperatura</p>
                <p className="text-2xl font-bold text-gray-700">--°C</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Umidità</p>
                <p className="text-2xl font-bold text-gray-700">--%</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Pioggia</p>
                <p className="text-2xl font-bold text-gray-700">-- mm</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Vento</p>
                <p className="text-2xl font-bold text-gray-700">-- km/h</p>
              </div>
            </div>
          </div>

          {/* Water Management */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-cyan-100 p-4 rounded-xl">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-agro-green-dark">Gestione Irrigazione</h3>
                <p className="text-gray-500">Calcoli basati su dati reali</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-cyan-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Fabbisogno Idrico</span>
                  <span className="text-sm text-cyan-600 font-bold">-- L/giorno</span>
                </div>
                <p className="text-xs text-gray-500">
                  Basato su: meteo, tipo coltura, fase crescita, evapotraspirazione
                </p>
              </div>
              <p className="text-gray-600 text-sm">
                Calcola automaticamente il fabbisogno idrico integrando dati dal radar meteo locale, riducendo sprechi e ottimizzando la crescita.
              </p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-agro-green-dark mb-6 text-center">
            Funzionalità di Monitoraggio Future
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Diario Fotografico</h4>
                <p className="text-sm text-gray-600">
                  Documenta la crescita con foto progressive per confrontare e identificare problemi
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Note e Osservazioni</h4>
                <p className="text-sm text-gray-600">
                  Registra osservazioni quotidiane e crea uno storico completo di ogni coltura
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Analisi Comparativa</h4>
                <p className="text-sm text-gray-600">
                  Confronta rese e performance tra diverse stagioni e varietà
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Sensori IoT</h4>
                <p className="text-sm text-gray-600">
                  Integrazione futura con sensori di umidità suolo, pH e temperatura
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-agro-green to-agro-lime rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Sistema di Monitoraggio in Sviluppo</h2>
          <p className="text-lg mb-6">
            Presto potrai tracciare ogni aspetto delle tue colture in un unico posto!
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

export default MonitoringPage;
