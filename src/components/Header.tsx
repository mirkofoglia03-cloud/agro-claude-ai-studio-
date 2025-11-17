import React from 'react';
import Button from './Button';

const Header: React.FC = (): JSX.Element => {
  const navLinks: Array<{ href: string; label: string }> = [
    { href: '#features', label: 'Funzionalità' },
    { href: '#how-it-works', label: 'Come Funziona' },
    { href: '#my-vegetables', label: 'I Miei Ortaggi' },
    { href: '#testimonials', label: 'Testimonianze' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-agro-green">Agro</span>
            <span className="text-2xl font-bold text-agro-lime">IO</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link: { href: string; label: string }) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-agro-green transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <Button
            variant="secondary"
            className="px-6 py-2 text-base"
          >
            Inizia Ora
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
