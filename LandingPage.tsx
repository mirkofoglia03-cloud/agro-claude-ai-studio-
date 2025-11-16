import React from 'react';
import {
  Button,
  Card,
  Container,
  Section,
  H1,
  H2,
  H3,
  Icon,
  FeatureCard,
  TestimonialCard,
  StepCard,
} from './ui-components';

// ========================================
// LANDING PAGE - AgroIO
// "Coltiva il Futuro"
// ========================================

interface LandingPageProps {
  onGetStarted: () => void;
}

// ========================================
// HEADER / NAVBAR
// ========================================
const Header: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <header className="bg-verde-principale text-white py-4 sticky top-0 z-50 shadow-lg">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="eco" className="text-white" size="md" />
            </div>
            <span className="font-serif text-2xl font-semibold">AgroIO</span>
          </div>

          {/* Navigazione Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-arancione-cta transition-colors duration-300">
              Funzionalità
            </a>
            <a href="#how-it-works" className="hover:text-arancione-cta transition-colors duration-300">
              Come Funziona
            </a>
            <a href="#testimonials" className="hover:text-arancione-cta transition-colors duration-300">
              Testimonianze
            </a>
            <a href="#pricing" className="hover:text-arancione-cta transition-colors duration-300">
              Prezzi
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onGetStarted}
              className="hidden sm:block text-white/80 hover:text-white transition-colors duration-300"
            >
              Accedi
            </button>
            <Button variant="primary" size="sm" onClick={onGetStarted}>
              Inizia Gratis
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

// ========================================
// HERO SECTION
// ========================================
const HeroSection: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Immagine di sfondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      {/* Overlay verde scuro */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Contenuto */}
      <Container className="relative z-10 text-center text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <H1 className="text-white mb-6 text-4xl md:text-h1">
            AgroIO: Coltiva il Futuro
          </H1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed font-sans">
            La piattaforma completa per l'agricoltura digitale.
            Gestisci i tuoi campi, monitora il meteo, pianifica le attività
            e ottimizza i raccolti con strumenti intelligenti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={onGetStarted}>
              Inizia la Prova Gratuita
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="!text-white !border-white hover:!bg-white hover:!text-verde-scuro"
              onClick={() => {
                const element = document.getElementById('how-it-works');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Scopri di Più
            </Button>
          </div>
          <p className="mt-6 text-white/70 text-sm">
            Nessuna carta di credito richiesta • Prova gratuita di 14 giorni
          </p>
        </div>
      </Container>
    </section>
  );
};

// ========================================
// SEZIONE "PERCHÉ AGROIO È DIVERSO?"
// ========================================
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'touch_app',
      title: 'Semplice da Usare',
      description:
        'Interfaccia intuitiva progettata per agricoltori di ogni livello. Nessuna competenza tecnica richiesta, inizia subito a gestire i tuoi campi.',
    },
    {
      icon: 'schedule',
      title: 'Risparmio di Tempo',
      description:
        'Automatizza le attività ripetitive, ricevi promemoria intelligenti e organizza il tuo lavoro quotidiano in modo efficiente.',
    },
    {
      icon: 'insights',
      title: 'Decisioni Informate',
      description:
        'Analisi meteo avanzate, previsioni stagionali e report finanziari per prendere le decisioni migliori per il tuo raccolto.',
    },
  ];

  return (
    <Section id="features" background="white" spacing="lg">
      <Container>
        <div className="text-center mb-16">
          <H2 className="mb-4">Perché AgroIO è Diverso?</H2>
          <p className="text-grigio-medio text-body-lg max-w-2xl mx-auto">
            Progettato da agricoltori per agricoltori, con strumenti che risolvono
            problemi reali del lavoro quotidiano in campo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// ========================================
// SEZIONE "COME FUNZIONA"
// ========================================
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Registrati in 2 Minuti',
      description:
        'Crea il tuo account gratuito, inserisci i dati della tua azienda agricola e configura il tuo primo campo. Nessuna carta di credito richiesta.',
    },
    {
      number: 2,
      title: 'Configura i Tuoi Campi',
      description:
        'Aggiungi i tuoi terreni, le colture che stai coltivando e imposta le preferenze di notifica. Il sistema si adatta alle tue esigenze.',
    },
    {
      number: 3,
      title: 'Inizia a Coltivare Meglio',
      description:
        'Monitora il meteo, pianifica le attività, registra le spese e ricevi consigli personalizzati per ottimizzare i tuoi raccolti.',
    },
  ];

  return (
    <Section id="how-it-works" background="beige" spacing="lg">
      <Container>
        <div className="text-center mb-16">
          <H2 className="mb-4">Come Funziona</H2>
          <p className="text-grigio-medio text-body-lg max-w-2xl mx-auto">
            Inizia a usare AgroIO in tre semplici passi e trasforma
            il modo in cui gestisci la tua attività agricola.
          </p>
        </div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`fade-in ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// ========================================
// SEZIONE TESTIMONIANZE
// ========================================
const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'AgroIO ha rivoluzionato la gestione della mia azienda. Prima perdevo ore a registrare le attività su carta, ora tutto è digitalizzato e accessibile ovunque.',
      author: 'Marco Bianchi',
      role: 'Agricoltore, Toscana',
    },
    {
      quote:
        'Le previsioni meteo integrate mi hanno salvato il raccolto più volte. Ricevo avvisi di gelate con giorni di anticipo, permettendomi di proteggere le colture in tempo.',
      author: 'Giulia Rossi',
      role: 'Viticoltrice, Piemonte',
    },
  ];

  return (
    <Section id="testimonials" background="white" spacing="lg">
      <Container>
        <div className="text-center mb-16">
          <H2 className="mb-4">Cosa Dicono i Nostri Utenti</H2>
          <p className="text-grigio-medio text-body-lg max-w-2xl mx-auto">
            Agricoltori di tutta Italia stanno già usando AgroIO
            per migliorare la loro produttività.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// ========================================
// SEZIONE CTA FINALE
// ========================================
const CtaSection: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <Section background="green" spacing="lg">
      <Container>
        <div className="text-center text-white max-w-3xl mx-auto">
          <H2 className="text-white mb-6">
            Pronto a Trasformare la Tua Azienda Agricola?
          </H2>
          <p className="text-white/90 text-body-lg mb-8 leading-relaxed">
            Unisciti a migliaia di agricoltori che stanno già usando AgroIO
            per risparmiare tempo, ridurre i costi e aumentare i raccolti.
            Inizia oggi la tua prova gratuita.
          </p>
          <Button variant="primary" size="lg" onClick={onGetStarted}>
            Inizia la Tua Prova Gratuita
          </Button>
          <p className="mt-4 text-white/70 text-sm">
            14 giorni gratis • Cancella quando vuoi • Nessun impegno
          </p>
        </div>
      </Container>
    </Section>
  );
};

// ========================================
// FOOTER
// ========================================
const Footer: React.FC = () => {
  return (
    <footer className="bg-verde-scuro text-white py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrizione */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name="eco" className="text-white" size="md" />
              </div>
              <span className="font-serif text-2xl font-semibold">AgroIO</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              La piattaforma completa per l'agricoltura digitale.
              Coltiva il futuro con noi.
            </p>
          </div>

          {/* Link Prodotto */}
          <div>
            <h4 className="font-semibold mb-4">Prodotto</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Funzionalità
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Prezzi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrazioni
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Link Risorse */}
          <div>
            <h4 className="font-semibold mb-4">Risorse</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Supporto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Link Azienda */}
          <div>
            <h4 className="font-semibold mb-4">Azienda</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chi Siamo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contatti
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Termini di Servizio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} AgroIO. Tutti i diritti riservati.</p>
        </div>
      </Container>
    </footer>
  );
};

// ========================================
// LANDING PAGE PRINCIPALE
// ========================================
const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-beige-crema">
      <Header onGetStarted={onGetStarted} />
      <main>
        <HeroSection onGetStarted={onGetStarted} />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection onGetStarted={onGetStarted} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
