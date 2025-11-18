import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyDifferentSection from '../components/WhyDifferentSection';
import HowItWorksSection from '../components/HowItWorksSection';
import MyVegetablesSection from '../components/MyVegetablesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const HomePage: React.FC = (): JSX.Element => {
  return (
    <>
      <HeroSection />
      <WhyDifferentSection />
      <HowItWorksSection />
      <MyVegetablesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
