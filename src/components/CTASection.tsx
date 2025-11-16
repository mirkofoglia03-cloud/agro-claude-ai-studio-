import React from 'react';
import Button from './Button';

const CTASection: React.FC = (): JSX.Element => {
  const handleTrialClick = (): void => {
    console.log('Trial signup clicked');
    // Add trial signup logic here
  };

  const handleExpertClick = (): void => {
    console.log('Expert consultation clicked');
    // Add expert consultation logic here
  };

  return (
    <section className="py-24 bg-agro-green">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Pronto a Trasformare la Tua Agricoltura?
        </h2>

        {/* Subtext */}
        <p className="text-xl text-white/90 mb-10">
          Unisciti a oltre 500 aziende agricole italiane che già usano AgroIO.
          Inizia oggi con 30 giorni di prova gratuita.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="white" onClick={handleTrialClick}>
            Inizia la Prova Gratuita
          </Button>
          <Button variant="outline" onClick={handleExpertClick}>
            Parla con un Esperto
          </Button>
        </div>

        {/* Trust Badge */}
        <p className="text-white/70 mt-6 text-sm">
          Nessuna carta di credito richiesta • Cancella quando vuoi
        </p>
      </div>
    </section>
  );
};

export default CTASection;
