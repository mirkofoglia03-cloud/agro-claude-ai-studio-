import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardHomePage: React.FC = (): JSX.Element => {
  const { user } = useAuth();

  const stats = [
    { label: 'Colture Attive', value: '12', icon: '🌱', color: 'bg-green-100 text-green-800' },
    { label: 'Raccolti Previsti', value: '5', icon: '📅', color: 'bg-blue-100 text-blue-800' },
    { label: 'Alert Attivi', value: '2', icon: '⚠️', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Guide Consultate', value: '8', icon: '📚', color: 'bg-purple-100 text-purple-800' },
  ];

  const quickActions = [
    {
      title: 'Esplora Database Ortaggi',
      description: 'Sfoglia oltre 60 prodotti agricoli con dettagli completi',
      to: '/my-vegetables',
      icon: '🥬',
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Pianifica Semine',
      description: 'Usa il calendario intelligente per le tue colture',
      to: '/calendar',
      icon: '📅',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Monitora Crescita',
      description: 'Traccia lo stato di salute delle tue piante',
      to: '/monitoring',
      icon: '📊',
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Consulta Guide',
      description: 'Accedi a tutorial e best practices',
      to: '/guides',
      icon: '📖',
      color: 'from-orange-500 to-red-600',
    },
  ];

  const recentActivities = [
    { type: 'info', message: 'Database aggiornato con 60+ prodotti', time: '2 ore fa' },
    { type: 'warning', message: 'Periodo ottimale per semina pomodori', time: '1 giorno fa' },
    { type: 'success', message: 'Profilo completato con successo', time: '2 giorni fa' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Benvenuto, {user?.email.split('@')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Ecco una panoramica del tuo orto digitale
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`text-3xl p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Azioni Rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className={`h-2 bg-gradient-to-r ${action.color}`}></div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{action.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-agro-green transition">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-agro-green group-hover:translate-x-1 transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Attività Recenti</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success'
                        ? 'bg-green-500'
                        : activity.type === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-gray-800">{activity.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-agro-green to-agro-lime rounded-xl shadow-md p-6 text-white">
            <h2 className="text-xl font-bold mb-4">💡 Suggerimento del Giorno</h2>
            <p className="mb-4">
              Hai già esplorato il nostro database completo di oltre 60 prodotti agricoli? Include informazioni dettagliate su semina, raccolta e consociazioni!
            </p>
            <Link
              to="/my-vegetables"
              className="inline-block bg-white text-agro-green px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Esplora Ora
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🚀 Novità</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-agro-green mt-1">•</span>
                <span className="text-gray-600">Database completo con 60+ prodotti</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-agro-green mt-1">•</span>
                <span className="text-gray-600">Sistema di navigazione migliorato</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-agro-green mt-1">•</span>
                <span className="text-gray-600">Immagini reali per ogni prodotto</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
