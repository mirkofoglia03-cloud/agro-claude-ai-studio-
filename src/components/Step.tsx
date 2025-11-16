import React from 'react';
import { StepProps } from '../types';

const Step: React.FC<StepProps> = ({
  number,
  title,
  description,
}): JSX.Element => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Step Number Circle */}
      <div className="w-20 h-20 bg-agro-green rounded-full flex items-center justify-center mb-6 shadow-lg">
        <span className="text-3xl font-bold text-white">{number}</span>
      </div>

      {/* Step Title */}
      <h3 className="text-2xl font-bold text-agro-green-dark mb-3">
        {title}
      </h3>

      {/* Step Description */}
      <p className="text-gray-600 max-w-sm">
        {description}
      </p>
    </div>
  );
};

export default Step;
