import React from 'react';
import { AgricultureProduct } from '../types';

interface ProductModalProps {
  product: AgricultureProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}): JSX.Element | null => {
  if (!isOpen || !product) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile':
        return 'bg-green-100 text-green-800';
      case 'medio':
        return 'bg-yellow-100 text-yellow-800';
      case 'difficile':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSunLabel = (exposure: string) => {
    switch (exposure) {
      case 'pieno-sole':
        return 'Pieno Sole ☀️';
      case 'mezz-ombra':
        return "Mezz'Ombra ⛅";
      case 'ombra':
        return 'Ombra 🌥️';
      default:
        return exposure;
    }
  };

  const getWaterLabel = (needs: string) => {
    switch (needs) {
      case 'basso':
        return 'Basso 💧';
      case 'medio':
        return 'Medio 💧💧';
      case 'alto':
        return 'Alto 💧💧💧';
      case 'molto-alto':
        return 'Molto Alto 💧💧💧💧';
      default:
        return needs;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header with Image */}
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="mb-2">
                <h2 className="text-3xl font-bold text-white mb-1">
                  {product.name}
                </h2>
                <p className="text-white/80 italic text-lg">
                  {product.scientificName}
                </p>
              </div>
              <div className="flex gap-2">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                    product.difficulty
                  )}`}
                >
                  Difficolt&agrave;: {product.difficulty}
                </span>
                <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Cultivation Period */}
              <div className="bg-agro-cream rounded-xl p-4">
                <h3 className="font-bold text-agro-green-dark mb-3 flex items-center gap-2">
                  <span>📅</span> Periodo di Coltivazione
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Semina:</span>
                    <span className="font-medium">{product.sowingPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Raccolto:</span>
                    <span className="font-medium">{product.harvestPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Germinazione:</span>
                    <span className="font-medium">
                      {product.germinationDays} giorni
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giorni al raccolto:</span>
                    <span className="font-medium">
                      {product.harvestDays} giorni
                    </span>
                  </div>
                </div>
              </div>

              {/* Growing Conditions */}
              <div className="bg-agro-cream rounded-xl p-4">
                <h3 className="font-bold text-agro-green-dark mb-3 flex items-center gap-2">
                  <span>🌱</span> Condizioni di Crescita
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Esposizione:</span>
                    <span className="font-medium">
                      {getSunLabel(product.sunExposure)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fabbisogno idrico:</span>
                    <span className="font-medium">
                      {getWaterLabel(product.waterNeeds)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperatura:</span>
                    <span className="font-medium">
                      {product.temperatureMin}°C - {product.temperatureMax}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">T. ideale:</span>
                    <span className="font-medium">
                      {product.temperatureIdeal}°C
                    </span>
                  </div>
                </div>
              </div>

              {/* Spacing */}
              <div className="bg-agro-lime/10 rounded-xl p-4">
                <h3 className="font-bold text-agro-green-dark mb-3 flex items-center gap-2">
                  <span>📏</span> Distanze di Impianto
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tra le file:</span>
                    <span className="font-medium">{product.rowDistance} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tra le piante:</span>
                    <span className="font-medium">{product.plantDistance} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profondit&agrave; semina:</span>
                    <span className="font-medium">{product.sowingDepth} cm</span>
                  </div>
                </div>
              </div>

              {/* Soil Type */}
              <div className="bg-agro-lime/10 rounded-xl p-4">
                <h3 className="font-bold text-agro-green-dark mb-3 flex items-center gap-2">
                  <span>🌍</span> Terreno e pH
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">{product.soilType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">pH:</span>
                    <span className="font-medium">{product.soilPH}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Companion Planting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span>✅</span> Buone Consociazioni
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.goodCompanions.length > 0 ? (
                    product.goodCompanions.map((companion, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {companion}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Nessuna consociazione particolare
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <span>❌</span> Consociazioni da Evitare
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.badCompanions.length > 0 ? (
                    product.badCompanions.map((companion, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {companion}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Nessuna incompatibilit&agrave; nota
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Suitable Environments */}
            <div className="mb-6">
              <h3 className="font-bold text-agro-green-dark mb-3 flex items-center gap-2">
                <span>🏡</span> Ambienti Consigliati
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.suitableFor.map((env, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-agro-green text-white rounded-full text-sm font-medium"
                  >
                    {env}
                  </span>
                ))}
              </div>
            </div>

            {/* Diseases */}
            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                <span>⚠️</span> Malattie e Parassiti Comuni
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.diseases.map((disease, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {disease}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            {product.notes && (
              <div className="bg-yellow-50 rounded-xl p-4">
                <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <span>💡</span> Note Importanti
                </h3>
                <p className="text-gray-700">{product.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
