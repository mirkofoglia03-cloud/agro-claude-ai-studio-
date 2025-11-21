import React from 'react';

const EcommercePage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">E-Commerce</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Acquista tutto ciò di cui hai bisogno per il tuo orto: semi, attrezzi, fertilizzanti e molto altro.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <button className="bg-agro-green/10 rounded-lg p-4 hover:bg-agro-green/20 transition border border-agro-green/20">
              <svg className="w-12 h-12 mx-auto mb-2 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-sm font-medium text-gray-800">Semi</p>
            </button>

            <button className="bg-agro-green/10 rounded-lg p-4 hover:bg-agro-green/20 transition border border-agro-green/20">
              <svg className="w-12 h-12 mx-auto mb-2 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-sm font-medium text-gray-800">Attrezzi</p>
            </button>

            <button className="bg-agro-green/10 rounded-lg p-4 hover:bg-agro-green/20 transition border border-agro-green/20">
              <svg className="w-12 h-12 mx-auto mb-2 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <p className="text-sm font-medium text-gray-800">Fertilizzanti</p>
            </button>

            <button className="bg-agro-green/10 rounded-lg p-4 hover:bg-agro-green/20 transition border border-agro-green/20">
              <svg className="w-12 h-12 mx-auto mb-2 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <p className="text-sm font-medium text-gray-800">Accessori</p>
            </button>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
            <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Shop Online</h3>
            <p className="text-gray-500 mb-4">
              Il catalogo prodotti sarà disponibile a breve
            </p>
            <button className="px-6 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition">
              Notificami al Lancio
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Spedizione Gratuita</p>
                <p className="text-xs text-gray-600">Ordini sopra i 50€</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Qualità Garantita</p>
                <p className="text-xs text-gray-600">Prodotti certificati</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Consegna Rapida</p>
                <p className="text-xs text-gray-600">2-3 giorni lavorativi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommercePage;
