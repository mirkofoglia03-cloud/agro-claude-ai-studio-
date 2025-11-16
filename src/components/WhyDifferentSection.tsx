import React from 'react';
import FeatureCard from './FeatureCard';
import { FeatureCardProps } from '../types';

const WhyDifferentSection: React.FC = (): JSX.Element => {
  const features: FeatureCardProps[] = [
    {
      icon: '🌱',
      title: 'AI Predittiva',
      description:
        'Algoritmi avanzati che prevedono malattie, condizioni meteo e momenti ottimali per semina e raccolta con precisione del 95%.',
    },
    {
      icon: '💧',
      title: 'Risparmio Idrico',
      description:
        'Sistema di irrigazione intelligente che riduce il consumo d\'acqua fino al 40% mantenendo la resa ottimale delle colture.',
    },
    {
      icon: '📊',
      title: 'Dashboard Intuitiva',
      description:
        'Monitora tutti i tuoi campi da un\'unica interfaccia semplice. Dati complessi trasformati in azioni concrete.',
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
