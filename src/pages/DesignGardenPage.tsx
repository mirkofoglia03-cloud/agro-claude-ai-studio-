import React from 'react';

const DesignGardenPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Progetta il tuo Orto</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Progetta e visualizza il layout del tuo orto in modo interattivo.
          </p>

          <div className="bg-gray-100 rounded-lg p-12 text-center border-2 border-dashed border-gray-300 mt-6">
            <svg className="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Area di Progettazione</h3>
            <p className="text-gray-500 mb-4">
              Qui potrai disegnare e organizzare il tuo orto con strumenti di planning visuale
            </p>
            <button className="px-6 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition">
              Inizia a Progettare
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-agro-green/10 rounded-lg p-4 border border-agro-green/20">
              <h4 className="font-semibold text-gray-800 mb-2">Layout Ottimizzato</h4>
              <p className="text-sm text-gray-600">Sfrutta al meglio lo spazio disponibile</p>
            </div>

            <div className="bg-agro-green/10 rounded-lg p-4 border border-agro-green/20">
              <h4 className="font-semibold text-gray-800 mb-2">Rotazione Colture</h4>
              <p className="text-sm text-gray-600">Pianifica la successione delle coltivazioni</p>
            </div>

            <div className="bg-agro-green/10 rounded-lg p-4 border border-agro-green/20">
              <h4 className="font-semibold text-gray-800 mb-2">Companion Planting</h4>
              <p className="text-sm text-gray-600">Suggerimenti per piante complementari</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignGardenPage;
