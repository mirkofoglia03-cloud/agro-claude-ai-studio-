import React, { useState } from 'react';

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Come posso iniziare a utilizzare AgroIO?',
      answer: 'Dopo aver effettuato il login, inizia dalla sezione "Il mio Orto" per configurare il tuo spazio e aggiungere i tuoi primi ortaggi dalla sezione "I miei Ortaggi".',
    },
    {
      question: 'Posso tracciare più orti contemporaneamente?',
      answer: 'Attualmente ogni account supporta la gestione di un orto principale. Funzionalità per gestire più orti saranno disponibili in futuro.',
    },
    {
      question: 'Come funziona l\'AgroGiardiniere AI?',
      answer: 'L\'AgroGiardiniere è il tuo assistente virtuale che fornisce consigli personalizzati basati sulle condizioni del tuo orto, il meteo locale e le migliori pratiche agricole.',
    },
    {
      question: 'I dati meteo sono aggiornati in tempo reale?',
      answer: 'Sì, la sezione Meteo utilizza API meteorologiche per fornirti previsioni aggiornate specifiche per la tua località.',
    },
    {
      question: 'Come posso contattare il supporto?',
      answer: 'Puoi contattarci attraverso la sezione Community o inviando un\'email a support@agroio.com. Siamo qui per aiutarti!',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Domande Frequenti (FAQ)</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Trova risposte alle domande più comuni su AgroIO e la gestione del tuo orto digitale.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-gray-800 text-left">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-agro-green/10 rounded-lg p-6 border border-agro-green/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Non hai trovato quello che cercavi?</h3>
            <p className="text-gray-600 mb-4">
              Contatta il nostro team di supporto o visita la sezione Community per fare domande agli altri utenti.
            </p>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-agro-green text-white rounded-lg hover:bg-agro-green/90 transition">
                Contatta Supporto
              </button>
              <button className="px-6 py-2 bg-white text-agro-green border border-agro-green rounded-lg hover:bg-agro-green/10 transition">
                Vai alla Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
