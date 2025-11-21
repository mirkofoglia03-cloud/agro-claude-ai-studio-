import React from 'react';

const ChecklistPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Check List</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Gestisci le tue attività quotidiane e programmate per l'orto.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input type="checkbox" className="w-5 h-5 text-agro-green" />
              <span className="text-gray-700">Esempio: Innaffiare le piante</span>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input type="checkbox" className="w-5 h-5 text-agro-green" />
              <span className="text-gray-700">Esempio: Controllare parassiti</span>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input type="checkbox" className="w-5 h-5 text-agro-green" />
              <span className="text-gray-700">Esempio: Concimare il terreno</span>
            </div>
          </div>

          <button className="mt-6 px-6 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition">
            Aggiungi Nuova Attività
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;
