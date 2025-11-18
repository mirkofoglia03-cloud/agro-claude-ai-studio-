import React from 'react';

const HeroSection: React.FC = (): JSX.Element => {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in-up">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-agro-green mb-6 leading-tight">
            Il Futuro dell'Agricoltura<br />
            <span className="text-agro-lime">è Intelligente</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto font-semibold">
            AgroIO utilizza l'intelligenza artificiale per ottimizzare le tue coltivazioni,
            ridurre gli sprechi e massimizzare i raccolti. Semplice, efficace, sostenibile.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
