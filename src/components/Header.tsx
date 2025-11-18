import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Header: React.FC = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Navigation links per utenti pubblici
  const publicNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/#features', label: 'Funzionalità' },
    { to: '/#how-it-works', label: 'Come Funziona' },
  ];

  // Navigation links per utenti autenticati
  const authNavLinks = [
    { to: '/my-vegetables', label: 'I Miei Ortaggi' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/calendar', label: 'Calendario' },
    { to: '/monitoring', label: 'Monitoraggio' },
    { to: '/guides', label: 'Guide' },
  ];

  const navLinks = isAuthenticated ? authNavLinks : publicNavLinks;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition">
            <span className="text-2xl font-bold text-agro-green">Agro</span>
            <span className="text-2xl font-bold text-agro-lime">IO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition px-3 py-2 rounded-lg ${
                  isActive(link.to)
                    ? 'text-agro-green bg-agro-green/5'
                    : 'text-gray-700 hover:text-agro-green hover:bg-agro-green/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

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

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <Button
                variant="secondary"
                className="px-6 py-2 text-base"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  variant="secondary"
                  className="px-6 py-2 text-base"
                >
                  Accedi
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
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
              <div className="pt-2">
                {isAuthenticated ? (
                  <Button
                    variant="secondary"
                    className="w-full px-6 py-3 text-base"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="secondary"
                      className="w-full px-6 py-3 text-base"
                    >
                      Accedi
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
