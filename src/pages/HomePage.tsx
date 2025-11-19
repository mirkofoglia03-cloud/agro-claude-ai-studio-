import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyDifferentSection from '../components/WhyDifferentSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const HomePage: React.FC = (): JSX.Element => {
  return (
    <>
      <HeroSection />
      <WhyDifferentSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
