import React from 'react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}): JSX.Element => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
      {/* Icon Container */}
      <div className="w-16 h-16 bg-agro-lime/20 rounded-xl flex items-center justify-center mb-6">
        <span className="text-3xl">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-agro-green-dark mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
