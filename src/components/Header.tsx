import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Header: React.FC = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth();

  // Durante il caricamento, mostra solo il logo per evitare flash
  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center hover:opacity-80 transition">
              <span className="text-2xl font-bold text-agro-green">Agro</span>
              <span className="text-2xl font-bold text-agro-lime">IO</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // Se l'utente è autenticato, mostra solo il logo
  if (isAuthenticated) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center hover:opacity-80 transition">
              <span className="text-2xl font-bold text-agro-green">Agro</span>
              <span className="text-2xl font-bold text-agro-lime">IO</span>
            </Link>
            {/* Spacer per centrare il logo o future notifiche */}
            <div></div>
          </div>
        </div>
      </header>
    );
  }

  // Per utenti non autenticati, usa gli hook necessari
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links per utenti pubblici
  const publicNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/#features', label: 'Funzionalità' },
    { to: '/#how-it-works', label: 'Come Funziona' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Per utenti non autenticati, mostra la navigazione completa
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition">
            <span className="text-2xl font-bold text-agro-green">Agro</span>
            <span className="text-2xl font-bold text-agro-lime">IO</span>
          </Link>

          {/* CTA Buttons - Desktop */}
          <div className="ml-auto hidden lg:flex items-center gap-3">
            <Link to="/login?mode=login">
              <Button
                variant="outline"
                className="px-6 py-2 text-base"
              >
                Accedi
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="secondary"
                className="px-6 py-2 text-base"
              >
                Inizia Ora
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {publicNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition px-4 py-3 rounded-lg ${
                    isActive(link.to)
                      ? 'text-agro-green bg-agro-green/5'
                      : 'text-gray-700 hover:text-agro-green hover:bg-agro-green/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                <Link to="/login?mode=login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full px-6 py-3 text-base"
                  >
                    Accedi
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="secondary"
                    className="w-full px-6 py-3 text-base"
                  >
                    Inizia Ora
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
