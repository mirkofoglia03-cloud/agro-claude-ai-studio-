import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyDifferentSection from './components/WhyDifferentSection';
import HowItWorksSection from './components/HowItWorksSection';
import MyVegetablesSection from './components/MyVegetablesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <WhyDifferentSection />
      <HowItWorksSection />
      <MyVegetablesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default App;
