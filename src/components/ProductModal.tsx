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
              <div className="flex items-center gap-3 mb-2">
                <span className="text-5xl">{product.emoji}</span>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {product.name}
                  </h2>
                  <p className="text-white/80 italic">
                    {product.scientificName}
                  </p>
                </div>
              </div>
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                  product.difficulty
                )}`}
              >
                Difficolt&agrave;: {product.difficulty}
              </span>
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
                    <span className="font-medium">
                      {product.sowingPeriod.start} - {product.sowingPeriod.end}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Raccolto:</span>
                    <span className="font-medium">
                      {product.harvestPeriod.start} -{' '}
                      {product.harvestPeriod.end}
                    </span>
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
                    <span className="text-gray-600">Temperatura ideale:</span>
                    <span className="font-medium">
                      {product.idealTemperature.min}°C -{' '}
                      {product.idealTemperature.max}°C
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
                    <span className="font-medium">
                      {product.rowDistance} cm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tra le piante:</span>
                    <span className="font-medium">
                      {product.plantDistance} cm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profondit&agrave; semina:</span>
                    <span className="font-medium">
                      {product.sowingDepth} cm
                    </span>
                  </div>
                </div>
              </div>

              {/* Soil Type */}
              <div className="bg-agro-lime/10 rounded-xl p-4">
                <h3 className="font-bold text-agro-green-dark mb-3 flex items-center gap-2">
                  <span>🌍</span> Tipo di Terreno
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.soilType.map((soil) => (
                    <span
                      key={soil}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                    >
                      {soil}
                    </span>
                  ))}
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
                    product.goodCompanions.map((companion) => (
                      <span
                        key={companion}
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
                    product.badCompanions.map((companion) => (
                      <span
                        key={companion}
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
                {product.suitableFor.map((env) => (
                  <span
                    key={env}
                    className="px-4 py-2 bg-agro-green text-white rounded-full text-sm font-medium"
                  >
                    {env.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <span>💡</span> Consigli Utili
              </h3>
              <ul className="space-y-2">
                {product.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diseases */}
            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                <span>⚠️</span> Malattie e Parassiti Comuni
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.diseases.map((disease) => (
                  <span
                    key={disease}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {disease}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            {product.nutritionalInfo && (
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span>🥗</span> Informazioni Nutrizionali
                </h3>
                <p className="text-gray-700">{product.nutritionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
