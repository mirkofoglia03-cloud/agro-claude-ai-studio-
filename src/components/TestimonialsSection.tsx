import React from 'react';
import TestimonialCard from './TestimonialCard';
import { TestimonialProps } from '../types';

const TestimonialsSection: React.FC = (): JSX.Element => {
  const testimonials: TestimonialProps[] = [
    {
      quote:
        'Da quando uso AgroIO ho aumentato la resa del 35% e ridotto i costi operativi. È come avere un agronomo esperto sempre al mio fianco.',
      author: 'Marco Bianchi',
      role: 'Agricoltore, Emilia-Romagna',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
      quote:
        "L'irrigazione intelligente ha fatto la differenza. Quest'estate abbiamo risparmiato migliaia di litri d'acqua senza compromettere la qualità.",
      author: 'Laura Rossi',
      role: 'Viticoltrice, Toscana',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      quote:
        "Finalmente riesco a gestire tutti i miei 50 ettari da un'unica dashboard. La previsione delle malattie mi ha salvato il raccolto due volte.",
      author: 'Giuseppe Verdi',
      role: 'Cerealicoltore, Puglia',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-agro-green-dark mb-4">
            Cosa Dicono i Nostri Clienti
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Agricoltori come te che hanno trasformato la loro attività
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(
            (testimonial: TestimonialProps, index: number) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
