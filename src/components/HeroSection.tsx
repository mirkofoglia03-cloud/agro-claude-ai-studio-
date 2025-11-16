import React from 'react';
import Button from './Button';

const HeroSection: React.FC = (): JSX.Element => {
  const handleTrialClick = (): void => {
    console.log('Trial button clicked');
    // Add trial signup logic here
  };

  const handleVideoClick = (): void => {
    console.log('Video button clicked');
    // Add video modal logic here
  };

  return (
    <section className="hero-bg min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in-up">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Il Futuro dell'Agricoltura<br />
            <span className="text-agro-lime">è Intelligente</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            AgroIO utilizza l'intelligenza artificiale per ottimizzare le tue coltivazioni,
            ridurre gli sprechi e massimizzare i raccolti. Semplice, efficace, sostenibile.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={handleTrialClick}>
              Prova Gratuita 30 Giorni
            </Button>
            <Button variant="outline" onClick={handleVideoClick}>
              Guarda il Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
