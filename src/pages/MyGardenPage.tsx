import React from 'react';
import { Link } from 'react-router-dom';

const MyGardenPage: React.FC = () => {
  // Mock data - in futuro questi dati verranno da un context o API
  const stats = {
    activeVegetables: 8,
    completedTasks: 12,
    scheduledTasks: 5,
    totalHarvests: 23,
  };

  const activeVegetables = [
    { id: 1, name: 'Pomodori', variety: 'San Marzano', plantedDate: '2025-03-15', status: 'Crescita', health: 'Ottima', daysToHarvest: 45 },
    { id: 2, name: 'Zucchine', variety: 'Romanesco', plantedDate: '2025-04-01', status: 'Fioritura', health: 'Buona', daysToHarvest: 30 },
    { id: 3, name: 'Basilico', variety: 'Genovese', plantedDate: '2025-04-10', status: 'Crescita', health: 'Ottima', daysToHarvest: 20 },
    { id: 4, name: 'Lattuga', variety: 'Romana', plantedDate: '2025-04-20', status: 'Crescita', health: 'Buona', daysToHarvest: 15 },
  ];

  const completedActivities = [
    { id: 1, task: 'Innaffiamento pomodori', date: '2025-11-21', time: '08:00', category: 'irrigazione' },
    { id: 2, task: 'Concimazione zucchine', date: '2025-11-20', time: '10:30', category: 'concimazione' },
    { id: 3, task: 'Controllo parassiti', date: '2025-11-19', time: '16:00', category: 'manutenzione' },
    { id: 4, task: 'Potatura basilico', date: '2025-11-18', time: '09:15', category: 'manutenzione' },
  ];

  const scheduledActivities = [
    { id: 1, task: 'Innaffiamento generale', date: '2025-11-22', time: '07:00', category: 'irrigazione', priority: 'alta' },
    { id: 2, task: 'Raccolta lattuga', date: '2025-11-23', time: '10:00', category: 'raccolta', priority: 'media' },
    { id: 3, task: 'Controllo malattie', date: '2025-11-24', time: '15:00', category: 'manutenzione', priority: 'alta' },
    { id: 4, task: 'Semina carote', date: '2025-11-25', time: '09:00', category: 'semina', priority: 'bassa' },
    { id: 5, task: 'Concimazione generale', date: '2025-11-27', time: '08:30', category: 'concimazione', priority: 'media' },
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Ottima': return 'text-green-600 bg-green-50';
      case 'Buona': return 'text-blue-600 bg-blue-50';
      case 'Discreta': return 'text-yellow-600 bg-yellow-50';
      case 'Critica': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'text-red-600 bg-red-50 border-red-200';
      case 'media': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'bassa': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigazione':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'raccolta':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'concimazione':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'semina':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Il mio Orto</h1>
          <p className="text-gray-600">Panoramica completa delle attività e dello stato del tuo orto</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-green-800">Ortaggi Attivi</h3>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.activeVegetables}</p>
            <p className="text-xs text-green-600 mt-1">In produzione</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-800">Attività Completate</h3>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.completedTasks}</p>
            <p className="text-xs text-blue-600 mt-1">Questo mese</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-yellow-800">Attività Programmate</h3>
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-yellow-700">{stats.scheduledTasks}</p>
            <p className="text-xs text-yellow-600 mt-1">Prossimi 7 giorni</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-purple-800">Raccolti Totali</h3>
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.totalHarvests}</p>
            <p className="text-xs text-purple-600 mt-1">Quest'anno</p>
          </div>
        </div>

        {/* Ortaggi in Produzione */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Ortaggi in Produzione</h2>
            <Link
              to="/my-vegetables"
              className="text-sm text-agro-green hover:text-agro-green/80 font-medium flex items-center gap-1"
            >
              Vedi tutti
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeVegetables.map((veg) => (
              <div key={veg.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{veg.name}</h3>
                    <p className="text-sm text-gray-500">{veg.variety}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(veg.health)}`}>
                    {veg.health}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Piantato il:</span>
                    <span className="font-medium text-gray-900">{new Date(veg.plantedDate).toLocaleDateString('it-IT')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Stato:</span>
                    <span className="font-medium text-gray-900">{veg.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Giorni al raccolto:</span>
                    <span className="font-medium text-agro-green">{veg.daysToHarvest} giorni</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 bg-agro-green/10 text-agro-green rounded text-xs font-medium hover:bg-agro-green/20 transition">
                      Dettagli
                    </button>
                    <button className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 transition">
                      Registra Attività
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attività */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attività Svolte */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Attività Svolte Recentemente</h2>

            <div className="space-y-3">
              {completedActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="mt-1 text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.task}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        {getCategoryIcon(activity.category)}
                        {activity.category}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString('it-IT')} - {activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/checklist"
              className="mt-4 block text-center text-sm text-agro-green hover:text-agro-green/80 font-medium"
            >
              Vedi tutte le attività →
            </Link>
          </div>

          {/* Attività Programmate */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Attività Programmate</h2>

            <div className="space-y-3">
              {scheduledActivities.map((activity) => (
                <div key={activity.id} className={`flex items-start gap-3 p-3 rounded-lg border ${getPriorityColor(activity.priority)}`}>
                  <div className="mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{activity.task}</p>
                      <span className="text-xs font-semibold uppercase">{activity.priority}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        {getCategoryIcon(activity.category)}
                        {activity.category}
                      </span>
                      <span className="text-xs text-gray-600">{new Date(activity.date).toLocaleDateString('it-IT')} - {activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/checklist"
              className="mt-4 block text-center text-sm text-agro-green hover:text-agro-green/80 font-medium"
            >
              Gestisci calendario attività →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-agro-green/10 to-agro-lime/10 rounded-lg p-6 border border-agro-green/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/my-vegetables"
              className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition"
            >
              <svg className="w-5 h-5 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Aggiungi Ortaggio</span>
            </Link>

            <Link
              to="/checklist"
              className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition"
            >
              <svg className="w-5 h-5 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Nuova Attività</span>
            </Link>

            <Link
              to="/harvests"
              className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition"
            >
              <svg className="w-5 h-5 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Registra Raccolto</span>
            </Link>

            <Link
              to="/weather"
              className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition"
            >
              <svg className="w-5 h-5 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Controlla Meteo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGardenPage;
