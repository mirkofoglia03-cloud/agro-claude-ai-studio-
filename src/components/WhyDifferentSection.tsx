import React from 'react';
import FeatureCard from './FeatureCard';
import { FeatureCardProps } from '../types';

const WhyDifferentSection: React.FC = (): JSX.Element => {
  const features: FeatureCardProps[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=800&q=80',
      title: '3D Project',
      description:
        'Progetta il tuo orto in base alle tue esigenze',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80',
      title: 'Calendario',
      description:
        'Organizza, Monitora e Programma le tue attività',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      title: 'DashBoard',
      description:
        'Trasforma dei semplici dati in azioni concrete',
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-agro-green-dark mb-4">
            Perché AgroIO è Diverso
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Non solo dati, ma decisioni intelligenti per la tua azienda agricola
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature: FeatureCardProps, index: number) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
