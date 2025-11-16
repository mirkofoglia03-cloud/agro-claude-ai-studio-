import React from 'react';
import { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  image,
}): JSX.Element => {
  const renderStars = (): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    for (let i: number = 0; i < 5; i++) {
      stars.push(<span key={i}>★</span>);
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      {/* Author Info */}
      <div className="flex items-center mb-6">
        <img
          src={image}
          alt={author}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-agro-green-dark">{author}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>

      {/* Quote */}
      <p className="text-gray-700 italic leading-relaxed">"{quote}"</p>

      {/* Star Rating */}
      <div className="mt-4 flex text-agro-lime">{renderStars()}</div>
    </div>
  );
};

export default TestimonialCard;
