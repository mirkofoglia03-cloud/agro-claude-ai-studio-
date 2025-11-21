import React from 'react';
import { ProductCardProps } from '../types';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  onAddToGarden,
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

  const getWaterLevel = (needs: string) => {
    return needs.charAt(0).toUpperCase() + needs.slice(1);
  };

  const getSunLabel = (exposure: string) => {
    return exposure.replace('-', ' ').split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
              {product.sowingPeriod}
            </div>
          </div>
          <div className="bg-agro-cream rounded-lg p-2">
            <div className="text-xs text-gray-500 mb-1">Raccolto</div>
            <div className="text-sm font-medium text-agro-green-dark">
              {product.harvestPeriod}
            </div>
          </div>
        </div>

        {/* Sun and Water */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600">
              {getSunLabel(product.sunExposure)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.5 2A2.5 2.5 0 003 4.5v11A2.5 2.5 0 005.5 18h9a2.5 2.5 0 002.5-2.5v-11A2.5 2.5 0 0014.5 2h-9zm4.5 10a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm0-4a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm-4 4a1 1 0 011-1h1a1 1 0 110 2H7a1 1 0 01-1-1zm0-4a1 1 0 011-1h1a1 1 0 010 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M9 4.5a.75.75 0 01.75.75v.518a4.784 4.784 0 012.45.38.75.75 0 11-.585 1.381A3.286 3.286 0 009 6.778V9.75h2.25a.75.75 0 010 1.5H9v.768c1.043.099 1.916.489 2.616.908a.75.75 0 01-.585 1.381 3.286 3.286 0 00-2.031-.75V15a.75.75 0 01-1.5 0v-.393a3.286 3.286 0 00-2.031.75.75.75 0 11-.585-1.381c.7-.42 1.573-.809 2.616-.908V11.25H5.25a.75.75 0 010-1.5H7.5V6.778a3.286 3.286 0 00-2.615.75.75.75 0 11-.585-1.381 4.784 4.784 0 012.45-.38V5.25A.75.75 0 019 4.5z" />
            </svg>
            <span className="text-xs text-gray-600">
              Acqua {getWaterLevel(product.waterNeeds)}
            </span>
          </div>
        </div>

        {/* Spacing Info */}
        <div className="bg-agro-lime/10 rounded-lg p-3 mb-4">
          <div className="text-xs font-semibold text-agro-green mb-2">
            Distanze
          </div>
          <div className="flex justify-between text-xs">
            <span>File: {product.rowDistance} cm</span>
            <span>Piante: {product.plantDistance} cm</span>
            <span>Prof: {product.sowingDepth} cm</span>
          </div>
        </div>

        {/* Suitable Environments */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.suitableFor.map((env) => (
            <span
              key={env}
              className="px-2 py-1 bg-agro-green/10 text-agro-green text-xs rounded-full"
            >
              {env.replace('-', ' ')}
            </span>
          ))}
        </div>

        {/* Add to Garden Button */}
        <button
          onClick={(e) => onAddToGarden?.(product, e)}
          className="w-full py-2.5 bg-agro-green text-white rounded-lg font-medium hover:bg-agro-green/90 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Aggiungi al tuo orto
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
