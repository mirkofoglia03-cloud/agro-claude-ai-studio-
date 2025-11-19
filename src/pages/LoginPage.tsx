import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Inserisci email e password');
      return;
    }

    // Per la demo, accetta qualsiasi credenziale
    login(email, password);
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
              Benvenuto!
            </h1>
            <p className="text-gray-600">
              Accedi per gestire il tuo orto digitale
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-agro-lime focus:outline-none transition"
                  placeholder="tua@email.com"
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

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">oppure</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                Non hai un account?
              </p>
              <button
                type="button"
                className="w-full border-2 border-agro-green text-agro-green font-semibold py-3 px-6 rounded-xl hover:bg-agro-green/5 transition"
              >
                Registrati Gratis
              </button>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/50 backdrop-blur rounded-xl p-4">
              <div className="text-2xl mb-2">🌱</div>
              <p className="text-xs font-medium text-gray-700">Database Completo</p>
            </div>
            <div className="bg-white/50 backdrop-blur rounded-xl p-4">
              <div className="text-2xl mb-2">📅</div>
              <p className="text-xs font-medium text-gray-700">Calendario Smart</p>
            </div>
            <div className="bg-white/50 backdrop-blur rounded-xl p-4">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-xs font-medium text-gray-700">Monitoraggio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
