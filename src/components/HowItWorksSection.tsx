import React from 'react';

const HowItWorksSection: React.FC = (): JSX.Element => {
  return (
    <section
      id="how-it-works"
      className="relative py-32 bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80)',
      }}
    >
      {/* Overlay scuro per leggibilità */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Come Funziona
          </h2>
        </div>

        {/* Testo Esplicativo */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
            <span className="font-bold text-agro-green">AgroIO</span> trasforma la gestione del tuo orto in un'esperienza intelligente e personalizzata.
          </p>

          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
            Inserisci i <span className="font-semibold text-agro-green-dark">dati delle tue colture</span> - tipologia di piante, spazio disponibile, condizioni del terreno - e la nostra piattaforma analizza ogni informazione per creare un <span className="font-semibold text-agro-green-dark">piano di coltivazione su misura</span>.
          </p>

          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
            Il sistema <span className="font-semibold text-agro-green-dark">programma automaticamente</span> le attività essenziali: semine, irrigazioni, concimazioni e raccolti. Ogni azione è calendarizzata al momento ottimale, considerando le caratteristiche specifiche di ogni ortaggio e le condizioni climatiche locali.
          </p>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-base md:text-lg text-gray-600 italic">
              Dai dati alla pratica: tutto quello che devi fare è seguire il piano personalizzato che AgroIO crea per te.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
