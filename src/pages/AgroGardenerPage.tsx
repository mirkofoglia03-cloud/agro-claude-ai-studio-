import React from 'react';

const AgroGardenerPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Il tuo AgroGiardiniere</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Il tuo assistente virtuale per consigli e supporto nella gestione dell'orto.
          </p>

          <div className="bg-gradient-to-r from-agro-green/10 to-agro-lime/10 rounded-lg p-8 mt-6 border border-agro-green/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-agro-green rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">AgroGiardiniere AI</h3>
                <p className="text-sm text-gray-600">Il tuo esperto di agricoltura sempre disponibile</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    Ciao! Sono il tuo AgroGiardiniere personale. Posso aiutarti con consigli su:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-agro-green">•</span> Quando e come piantare
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-agro-green">•</span> Problemi di parassiti e malattie
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-agro-green">•</span> Ottimizzazione irrigazione
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-agro-green">•</span> Consigli stagionali
                    </li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Fai una domanda all'AgroGiardiniere..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-green"
                  />
                  <button className="px-6 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition">
                    Invia
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> L'integrazione AI è in fase di sviluppo. A breve potrai interagire con l'assistente virtuale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgroGardenerPage;
