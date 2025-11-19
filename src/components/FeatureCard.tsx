import React from 'react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  imageUrl,
  title,
  description,
}): JSX.Element => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
      {/* Image or Icon Container */}
      {imageUrl ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : icon ? (
        <div className="w-16 h-16 bg-agro-lime/20 rounded-xl flex items-center justify-center m-8 mb-6">
          <span className="text-3xl">{icon}</span>
        </div>
      ) : null}

      <div className="p-8 pt-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-agro-green-dark mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
