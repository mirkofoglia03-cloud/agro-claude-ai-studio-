import React from 'react';

const MyGardenPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Il mio Orto</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Benvenuto nella sezione principale del tuo orto. Qui potrai gestire e monitorare tutto il tuo spazio verde.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-agro-green/10 rounded-lg p-6 border border-agro-green/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dashboard Overview</h3>
              <p className="text-sm text-gray-600">Visualizza statistiche e informazioni sul tuo orto</p>
            </div>

            <div className="bg-agro-green/10 rounded-lg p-6 border border-agro-green/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mappe e Layout</h3>
              <p className="text-sm text-gray-600">Organizza visivamente il tuo spazio</p>
            </div>

            <div className="bg-agro-green/10 rounded-lg p-6 border border-agro-green/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Attività Recenti</h3>
              <p className="text-sm text-gray-600">Monitora le ultime operazioni</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGardenPage;
