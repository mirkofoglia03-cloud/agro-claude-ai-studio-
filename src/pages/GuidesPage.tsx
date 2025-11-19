import React from 'react';
import { Link } from 'react-router-dom';

const GuidesPage: React.FC = (): JSX.Element => {
  const guideCategories = [
    {
      title: 'Guide per Principianti',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'green',
      guides: [
        'Come Preparare il Terreno',
        'Primi Passi nella Semina',
        'Irrigazione per Principianti',
        'Riconoscere le Piante Infestanti'
      ]
    },
    {
      title: 'Tecniche Avanzate',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: 'blue',
      guides: [
        'Potatura e Cimatura',
        'Innesti e Propagazione',
        'Gestione Avanzata del Suolo',
        'Tecniche di Pacciamatura'
      ]
    },
    {
      title: 'Difesa Biologica',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'yellow',
      guides: [
        'Antiparassitari Naturali',
        'Insetti Utili nell\'Orto',
        'Prevenzione delle Malattie',
        'Macerati e Decotti'
      ]
    },
    {
      title: 'Consociazioni e Rotazioni',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: 'purple',
      guides: [
        'Guida alle Consociazioni',
        'Pianificare la Rotazione',
        'Colture di Copertura',
        'Sovescio e Fertilità'
      ]
    },
    {
      title: 'Coltivazione in Contenitore',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'red',
      guides: [
        'Orto sul Balcone',
        'Scegliere i Contenitori Giusti',
        'Substrati per Vasi',
        'Ortaggi Ideali per Vasi'
      ]
    },
    {
      title: 'Conservazione e Raccolta',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      color: 'orange',
      guides: [
        'Quando Raccogliere',
        'Metodi di Conservazione',
        'Essicazione e Congelamento',
        'Preparazione dei Semi'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' }
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="min-h-screen bg-agro-cream pt-6 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-agro-green-dark mb-4">
            Guide e Tutorial
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Impara le migliori tecniche di coltivazione, dalla semina alla raccolta
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Cerca guide e tutorial..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Guide Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guideCategories.map((category) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <div
                key={category.title}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition border-2 ${colorClasses.border}`}
              >
                <div className={`${colorClasses.bg} ${colorClasses.text} p-4 rounded-xl w-fit mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-agro-green-dark mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.guides.map((guide) => (
                    <li key={guide} className="flex items-start gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-agro-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm hover:text-agro-green cursor-pointer transition">
                        {guide}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">
                    {category.guides.length} guide disponibili
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Content */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-agro-green-dark mb-6">
            Contenuti in Arrivo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-agro-green/10 p-3 rounded-xl h-fit">
                <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Video Tutorial</h4>
                <p className="text-sm text-gray-600">
                  Video dettagliati passo-passo per ogni fase della coltivazione
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-agro-green/10 p-3 rounded-xl h-fit">
                <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Guide Stagionali</h4>
                <p className="text-sm text-gray-600">
                  Consigli specifici per ogni stagione dell'anno
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-agro-green/10 p-3 rounded-xl h-fit">
                <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Comunità e Forum</h4>
                <p className="text-sm text-gray-600">
                  Scambia esperienze con altri coltivatori
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-agro-green/10 p-3 rounded-xl h-fit">
                <svg className="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">E-book Scaricabili</h4>
                <p className="text-sm text-gray-600">
                  Guide complete da portare sempre con te
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-agro-green to-agro-lime rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Biblioteca Guide in Costruzione</h2>
          <p className="text-lg mb-6">
            Presto avrai accesso a centinaia di guide dettagliate per diventare un esperto coltivatore!
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

export default GuidesPage;
