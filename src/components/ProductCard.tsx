import React from 'react';
import { ProductCardProps } from '../types';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}): JSX.Element => {
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

  const getWaterIcon = (needs: string) => {
    switch (needs) {
      case 'basso':
        return '💧';
      case 'medio':
        return '💧💧';
      case 'alto':
        return '💧💧💧';
      default:
        return '💧';
    }
  };

  const getSunIcon = (exposure: string) => {
    switch (exposure) {
      case 'pieno-sole':
        return '☀️';
      case 'mezz-ombra':
        return '⛅';
      case 'ombra':
        return '🌥️';
      default:
        return '☀️';
    }
  };

  return (
    <div
      onClick={() => onClick?.(product)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="text-4xl">{product.emoji}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
              product.difficulty
            )}`}
          >
            {product.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name and Scientific Name */}
        <h3 className="text-xl font-bold text-agro-green-dark mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 italic mb-3">
          {product.scientificName}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-agro-cream rounded-lg p-2">
            <div className="text-xs text-gray-500 mb-1">Semina</div>
            <div className="text-sm font-medium text-agro-green-dark">
              {product.sowingPeriod.start} - {product.sowingPeriod.end}
            </div>
          </div>
          <div className="bg-agro-cream rounded-lg p-2">
            <div className="text-xs text-gray-500 mb-1">Raccolto</div>
            <div className="text-sm font-medium text-agro-green-dark">
              {product.harvestPeriod.start} - {product.harvestPeriod.end}
            </div>
          </div>
        </div>

        {/* Sun and Water */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getSunIcon(product.sunExposure)}</span>
            <span className="text-xs text-gray-600">
              {product.sunExposure.replace('-', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{getWaterIcon(product.waterNeeds)}</span>
            <span className="text-xs text-gray-600">
              Acqua {product.waterNeeds}
            </span>
          </div>
        </div>

        {/* Spacing Info */}
        <div className="bg-agro-lime/10 rounded-lg p-3 mb-4">
          <div className="text-xs font-semibold text-agro-green mb-2">
            Distanze
          </div>
          <div className="flex justify-between text-xs">
            <span>File: {product.rowDistance}cm</span>
            <span>Piante: {product.plantDistance}cm</span>
            <span>Prof: {product.sowingDepth}cm</span>
          </div>
        </div>

        {/* Suitable Environments */}
        <div className="flex flex-wrap gap-1">
          {product.suitableFor.map((env) => (
            <span
              key={env}
              className="px-2 py-1 bg-agro-green/10 text-agro-green text-xs rounded-full"
            >
              {env.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
