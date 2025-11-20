import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const isLoginMode = searchParams.get('mode') === 'login';

  // Campi registrazione
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [socialWebsite, setSocialWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Campi login
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email) {
      setError('Nome, Cognome ed Email sono obbligatori');
      return;
    }

    // Per la demo, registra e fa login automaticamente
    login(email, 'demo');
    navigate('/dashboard');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginEmail || !password) {
      setError('Inserisci email e password');
      return;
    }

    // Per la demo, accetta qualsiasi credenziale
    login(loginEmail, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agro-cream via-white to-agro-lime/10 pt-6 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-agro-green">Agro</span>
              <span className="text-4xl font-bold text-agro-lime">IO</span>
            </div>
            <h1 className="text-3xl font-bold text-agro-green-dark mb-2">
              {isLoginMode ? 'Bentornato!' : 'Benvenuto!'}
            </h1>
            <p className="text-gray-600">
              {isLoginMode ? 'Accedi per gestire il tuo orto digitale' : 'Inizia a gestire il tuo orto digitale'}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!isLoginMode ? (
              // REGISTRATION FORM
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                {/* Nome */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                    placeholder="Il tuo nome"
                    required
                  />
                </div>

                {/* Cognome */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Cognome *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                    placeholder="Il tuo cognome"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                    placeholder="tua@email.com"
                    required
                  />
                </div>

                {/* Pagina Social/Sito Web (facoltativo) */}
                <div>
                  <label htmlFor="socialWebsite" className="block text-sm font-semibold text-gray-700 mb-2">
                    Pagina Social / Sito Web <span className="text-gray-400 font-normal">(facoltativo)</span>
                  </label>
                  <input
                    id="socialWebsite"
                    type="text"
                    value={socialWebsite}
                    onChange={(e) => setSocialWebsite(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                    placeholder="es. instagram.com/tuoaccount"
                  />
                </div>

                {/* Nome Azienda (facoltativo) */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Azienda <span className="text-gray-400 font-normal">(facoltativo)</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                    placeholder="Nome della tua azienda"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Demo Notice */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-blue-800 text-sm font-medium mb-1">
                    Modalità Demo
                  </p>
                  <p className="text-blue-600 text-xs">
                    Per questa demo, compila i campi obbligatori per accedere
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-agro-green to-agro-lime text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition transform hover:scale-105"
                >
                  Registrati
                </button>
              </form>
            ) : (
              // LOGIN FORM
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="loginEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="loginEmail"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                    placeholder="tua@email.com"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Demo Notice */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-blue-800 text-sm font-medium mb-1">
                    Modalità Demo
                  </p>
                  <p className="text-blue-600 text-xs">
                    Per questa demo, inserisci qualsiasi email e password per accedere
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-agro-green to-agro-lime text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition transform hover:scale-105"
                >
                  Accedi
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">oppure</span>
              </div>
            </div>

            {/* Toggle between Register/Login */}
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                {isLoginMode ? 'Non hai un account?' : 'Hai già un account?'}
              </p>
              <a
                href={isLoginMode ? '/login' : '/login?mode=login'}
                className="block w-full border-2 border-agro-green text-agro-green font-semibold py-3 px-6 rounded-xl hover:bg-agro-green/5 transition"
              >
                {isLoginMode ? 'Registrati' : 'Accedi'}
              </a>
            </div>
          </div>

          {/* Features Preview - Removed emojis */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/50 backdrop-blur rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Database Completo</p>
              <p className="text-xs text-gray-600">60+ prodotti</p>
            </div>
            <div className="bg-white/50 backdrop-blur rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Calendario Smart</p>
              <p className="text-xs text-gray-600">Pianifica attività</p>
            </div>
            <div className="bg-white/50 backdrop-blur rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Monitoraggio</p>
              <p className="text-xs text-gray-600">Dati in tempo reale</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
