import React from 'react';

const CommunityPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Community GrowUP Together</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Connettiti con altri appassionati di orticoltura, condividi esperienze e impara dalla community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-green-50 to-agro-green/10 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Forum & Discussioni</h3>
              <p className="text-sm text-gray-600 mb-4">
                Partecipa alle conversazioni, fai domande e condividi i tuoi successi
              </p>
              <button className="px-4 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition text-sm">
                Vai al Forum
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Eventi & Workshop</h3>
              <p className="text-sm text-gray-600 mb-4">
                Scopri eventi locali e workshop di giardinaggio nella tua zona
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                Vedi Eventi
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Scambio Semi & Piante</h3>
              <p className="text-sm text-gray-600 mb-4">
                Scambia semi e piante con altri membri della community
              </p>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm">
                Inizia Scambio
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Gallery & Ispirazioni</h3>
              <p className="text-sm text-gray-600 mb-4">
                Sfoglia foto di orti e lasciati ispirare dai progetti degli altri
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                Esplora Gallery
              </button>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-agro-green/10 to-agro-lime/10 rounded-lg p-6 border border-agro-green/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ultimi Post della Community</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center py-8">Nessun post disponibile al momento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
