import React from 'react';

const HowItWorksSection: React.FC = (): JSX.Element => {
  return (
    <section
      id="how-it-works"
      className="relative py-40 bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80)',
      }}
    >
      {/* Overlay scuro per leggibilità */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8">
            Come Funziona
          </h2>
        </div>

        {/* Testo Sintetico e Dinamico */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-2xl border border-white/20">
          <p className="text-2xl md:text-3xl text-white font-bold leading-relaxed mb-6">
            Inserisci i tuoi dati.
            <br />
            <span className="text-agro-lime">AgroIO pianifica tutto.</span>
          </p>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Dalla semina alla raccolta, ogni attività viene programmata automaticamente.
            <br className="hidden md:block" />
            Il tuo orto, gestito con intelligenza.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
