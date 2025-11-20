import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const CTASection: React.FC = (): JSX.Element => {
  const plans = [
    { name: 'Gratis', description: '' },
    { name: 'Pro', description: '' },
    { name: 'Business', description: '' },
  ];

  return (
    <section className="py-24 bg-agro-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Pronto a Trasformare la Tua Agricoltura?
        </h2>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              {/* Plan Name */}
              <h3 className="text-3xl font-bold text-agro-green mb-6 text-center">
                {plan.name}
              </h3>

              {/* CTA Button */}
              <div className="mt-8">
                <Link to="/login" className="block">
                  <Button variant="primary" className="w-full">
                    Inizia Ora
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
