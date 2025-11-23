import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  type: 'sowing' | 'harvest' | 'treatment' | 'irrigation';
  color: string;
}

const CalendarPage: React.FC = (): JSX.Element => {
  const months = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events] = useState<CalendarEvent[]>([
    { id: 1, title: 'Semina Pomodori', date: new Date(2025, 2, 15), type: 'sowing', color: 'bg-green-500' },
    { id: 2, title: 'Raccolta Insalata', date: new Date(2025, 2, 20), type: 'harvest', color: 'bg-orange-500' },
    { id: 3, title: 'Irrigazione Generale', date: new Date(2025, 2, 18), type: 'irrigation', color: 'bg-blue-500' },
  ]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const dayEvents = events.filter(
        (event) => event.date.toDateString() === currentDate.toDateString()
      );

      days.push(
        <div
          key={day}
          className="border border-gray-200 rounded-lg p-2 min-h-[80px] hover:bg-agro-cream transition cursor-pointer"
        >
          <div className="font-semibold text-sm text-gray-700 mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={`text-xs ${event.color} text-white px-2 py-1 rounded`}
              >
                {event.title.substring(0, 10)}...
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="min-h-screen bg-agro-cream pt-6 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-agro-green-dark mb-4">
            Calendario Agricolo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pianifica e monitora tutte le attività del tuo orto
          </p>
        </div>

        {/* Month View Calendar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-agro-green-dark">
              {months[currentMonth]} {currentYear}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Add Event Button */}
          <div className="mb-6">
            <button
              onClick={() => console.log('Aggiungi attività - funzione da implementare')}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-agro-green to-agro-lime text-white font-bold rounded-xl hover:shadow-lg transition"
            >
              + Aggiungi Attività
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-4">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map((day) => (
                <div key={day} className="text-center font-bold text-gray-600 text-sm">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {renderCalendarDays()}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Semina</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-600">Raccolta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-600">Trattamento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Irrigazione</span>
            </div>
          </div>
        </div>

        {/* Year Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-agro-green-dark mb-6">Panoramica Annuale</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => setCurrentMonth(index)}
                className={`border-2 rounded-xl p-4 hover:border-agro-lime hover:shadow-md transition ${
                  index === currentMonth ? 'border-agro-green bg-agro-green/5' : 'border-gray-200'
                }`}
              >
                <h3 className="font-bold text-agro-green-dark mb-2">{month}</h3>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">Semine: {events.filter(e => e.date.getMonth() === index && e.type === 'sowing').length}</p>
                  <p>Raccolti: {events.filter(e => e.date.getMonth() === index && e.type === 'harvest').length}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-agro-green/10 p-3 rounded-xl">
                <svg className="w-8 h-8 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Calendario Personalizzato</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600">
              Il calendario si adatta automaticamente al microclima della tua zona, suggerendo i periodi ottimali per ogni coltura in base a temperatura, umidità e stagionalità locale.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Promemoria Automatici</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600">
              Ricevi notifiche per non dimenticare le date di semina, trapianto, concimazione e raccolta. Tutto sincronizzato con le previsioni meteo.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Consociazioni Ottimali</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600">
              Il sistema suggerisce automaticamente le migliori combinazioni di piante da seminare insieme, massimizzando lo spazio e migliorando la resa.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-agro-green-dark text-lg">Rotazione Colture</h3>
                <p className="text-sm text-gray-500">In sviluppo</p>
              </div>
            </div>
            <p className="text-gray-600">
              Pianifica la rotazione delle colture per mantenere il terreno fertile e prevenire malattie, con suggerimenti automatici basati sulla storia del tuo orto.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-agro-green to-agro-lime rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Funzionalità in Arrivo</h2>
          <p className="text-lg mb-6">
            Il calendario dinamico sarà presto disponibile. Nel frattempo, esplora il nostro database completo!
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-agro-green px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
