import React from 'react';
import Step from './Step';
import { StepProps } from '../types';

const HowItWorksSection: React.FC = (): JSX.Element => {
  const steps: StepProps[] = [
    {
      number: '1',
      title: 'Collega i Sensori',
      description:
        'Installa i nostri sensori IoT nei tuoi campi. Configurazione guidata in meno di 30 minuti.',
    },
    {
      number: '2',
      title: 'Analisi Automatica',
      description:
        "L'IA raccoglie e analizza i dati in tempo reale: umidità, temperatura, nutrienti del suolo.",
    },
    {
      number: '3',
      title: 'Agisci con Sicurezza',
      description:
        'Ricevi raccomandazioni personalizzate e automatizza le operazioni per risultati ottimali.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-agro-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-agro-green-dark mb-4">
            Come Funziona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tre semplici passi per rivoluzionare la tua agricoltura
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step: StepProps, index: number) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
