import React from 'react';

const HarvestsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Raccolti</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Tieni traccia di tutti i tuoi raccolti e monitora la produttività del tuo orto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-4xl font-bold text-green-600 mb-2">0</h3>
              <p className="text-sm text-gray-600">Raccolti Totali</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-4xl font-bold text-green-600 mb-2">0 kg</h3>
              <p className="text-sm text-gray-600">Peso Totale</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-4xl font-bold text-green-600 mb-2">0</h3>
              <p className="text-sm text-gray-600">Varietà Coltivate</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Registro Raccolti</h2>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">Nessun raccolto registrato ancora</p>
              <button className="mt-4 px-6 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition">
                Registra Primo Raccolto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestsPage;
