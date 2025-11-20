import React from 'react';

const HeroSection: React.FC = (): JSX.Element => {
  return (
    <section
      className="min-h-screen flex items-center justify-center pt-16 bg-cover bg-center relative"
      style={{
        backgroundImage: 'url(https://drive.google.com/uc?export=view&id=1TmD1GbAdoYz3kggGrkacBUbpJ6RmySwx)',
      }}
    >
      {/* Overlay scuro per leggibilità */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="fade-in-up">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Il Futuro dell'Agricoltura<br />
            <span className="text-agro-lime">è Intelligente</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto font-semibold drop-shadow-md">
            AgroIO utilizza l'intelligenza artificiale per ottimizzare le tue coltivazioni,
            ridurre gli sprechi e massimizzare i raccolti. Semplice, efficace, sostenibile.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
