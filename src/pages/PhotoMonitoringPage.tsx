import React, { useState } from 'react';
import CameraUpload from '../components/CameraUpload';

interface PlantPhoto {
  id: number;
  plantName: string;
  date: string;
  notes: string;
  images: string[];
}

const PhotoMonitoringPage: React.FC = (): JSX.Element => {
  const [photos] = useState<PlantPhoto[]>([
    {
      id: 1,
      plantName: 'Pomodori - Settore A',
      date: '2025-03-15',
      notes: 'Crescita ottimale, necessaria irrigazione',
      images: [],
    },
  ]);

  const handleImageCapture = (imageData: string) => {
    console.log('Image captured:', imageData.substring(0, 50));
    // In una implementazione reale, qui si salverebbero le immagini
  };

  return (
    <div className="min-h-screen bg-agro-cream pt-6 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-agro-green-dark mb-4">
            Monitoraggio Fotografico
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Documenta la crescita delle tue colture con foto regolari
          </p>
        </div>

        {/* Camera Upload Component */}
        <div className="mb-8">
          <CameraUpload
            onImageCapture={handleImageCapture}
            title="Aggiungi Foto Coltura"
            description="Scatta foto per monitorare lo stato di salute delle piante"
          />
        </div>

        {/* Photo History */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-agro-green-dark mb-6">Storico Fotografie</h2>

          <div className="space-y-6">
            {photos.map((photo) => (
              <div key={photo.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-agro-lime transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-agro-green-dark mb-1">
                      {photo.plantName}
                    </h3>
                    <p className="text-sm text-gray-500">{photo.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {photo.images.length} foto
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{photo.notes}</p>
                {photo.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photo.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${photo.plantName} ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm">Nessuna foto ancora aggiunta</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-blue-100 p-3 rounded-xl w-fit mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-agro-green-dark mb-2">Luce Naturale</h3>
            <p className="text-gray-600 text-sm">
              Scatta foto con luce naturale per una migliore qualità e analisi accurata dello stato delle piante.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-green-100 p-3 rounded-xl w-fit mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-agro-green-dark mb-2">Frequenza Regolare</h3>
            <p className="text-gray-600 text-sm">
              Fotografa le tue colture ogni 3-7 giorni per monitorare la crescita e identificare tempestivamente problemi.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-agro-green-dark mb-2">Note Dettagliate</h3>
            <p className="text-gray-600 text-sm">
              Aggiungi note su condizioni meteo, irrigazione e osservazioni per un monitoraggio completo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoMonitoringPage;
