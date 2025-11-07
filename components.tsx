
import React, { useState } from 'react';
// Fix: 'SubscriptionPlan' was imported as a type, but it's used as a value. Enums have a runtime representation, so they should be imported as values. I've separated the enum import from the type-only imports.
import type { NavItemType, WeatherDay, TaskSuggestion, User, Task } from './types';
import { SubscriptionPlan } from './types';
import { NAV_ITEMS, MOCK_TASKS } from './constants';
import { isFeatureAllowed } from './services';

// =================================================================
// Reusable Components
// =================================================================
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const PlaceholderView: React.FC<{ title: string }> = ({ title }) => (
  <Card>
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    <p className="mt-4 text-gray-600">Questa funzionalità è in fase di sviluppo. Torna presto per scoprire le novità!</p>
    <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400">Contenuto Platzhalter</span>
    </div>
  </Card>
);

const Spinner: React.FC = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
);

// =================================================================
// Onboarding Components
// =================================================================
interface SubscriptionProps { onSelectPlan: (plan: SubscriptionPlan) => void; }
export const Subscription: React.FC<SubscriptionProps> = ({ onSelectPlan }) => {
    const plans = [
        { name: SubscriptionPlan.HOBBY, price: "€0", features: ["Gestione Orto", "Checklist Base", "Meteo"], color: "green" },
        { name: SubscriptionPlan.PRO, price: "€9.99", features: ["Funzioni Hobby", "Progettazione Orto", "Supporto AI"], color: "blue" },
        { name: SubscriptionPlan.BUSINESS, price: "€29.99", features: ["Funzioni Pro", "Gestione Finanziaria", "E-Commerce"], color: "indigo" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Benvenuto in AgroIO</h1>
            <p className="text-lg text-gray-600 mb-10">Scegli il piano più adatto a te per iniziare.</p>
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
                {plans.map(p => (
                    <div key={p.name} className={`border-2 border-${p.color}-500 rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform`}>
                        <h2 className={`text-2xl font-bold text-${p.color}-600`}>{p.name}</h2>
                        <p className="text-4xl font-extrabold my-4">{p.price}<span className="text-lg font-medium text-gray-500">/mese</span></p>
                        <ul className="space-y-2 text-gray-600 mb-6">
                            {p.features.map(f => <li key={f} className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>{f}</li>)}
                        </ul>
                        <button onClick={() => onSelectPlan(p.name)} className={`mt-auto w-full bg-${p.color}-500 text-white font-bold py-3 rounded-lg hover:bg-${p.color}-600 transition-colors`}>
                            Seleziona Piano
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface RegistrationProps { onRegister: (user: Omit<User, 'id' | 'lat' | 'lng'>) => void; plan: SubscriptionPlan; onBack: () => void; }
export const Registration: React.FC<RegistrationProps> = ({ onRegister, plan, onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email) {
            onRegister({ name, email });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
             <button onClick={onBack} className="absolute top-6 left-6 text-gray-600 hover:text-gray-900">&larr; Torna ai piani</button>
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-2">Registrati a AgroIO</h2>
                <p className="text-center text-gray-500 mb-6">Piano selezionato: <span className="font-bold text-green-600">{plan}</span></p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">Completa Registrazione</button>
                </form>
            </Card>
        </div>
    );
};

// =================================================================
// Layout Components
// =================================================================
interface SidebarProps { activeView: NavItemType; onNavClick: (view: NavItemType) => void; isOpen: boolean; setOpen: (isOpen: boolean) => void; onProfileClick: () => void; user: User; plan: SubscriptionPlan; onLogout: () => void; }
export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavClick, isOpen, setOpen, onProfileClick, user, plan, onLogout }) => {
    return (
        <>
            <div className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)}></div>
            <div className={`fixed top-0 left-0 h-full bg-white w-64 shadow-xl z-40 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:shadow-none`}>
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold text-green-600">AgroIO</h1>
                </div>
                <nav className="flex-1 p-2 space-y-1">
                    {NAV_ITEMS.map(item => {
                        if (!isFeatureAllowed(item.plan, plan) && item.name !== 'Upgrade') return null;
                        const isActive = activeView === item.name;
                        return (
                            <a key={item.name} href="#" onClick={(e) => { e.preventDefault(); onNavClick(item.name); }}
                                className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                                <span className="font-medium">{item.name}</span>
                            </a>
                        );
                    })}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <div className="flex items-center mb-4 cursor-pointer" onClick={onProfileClick}>
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg mr-3">{user.name.charAt(0)}</div>
                        <div>
                            <p className="font-semibold text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{plan}</p>
                        </div>
                    </div>
                    <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

interface HeaderProps { title: string; icon: React.ReactNode; onMenuClick: () => void; }
export const Header: React.FC<HeaderProps> = ({ title, icon, onMenuClick }) => (
    <header className="bg-white shadow-sm p-4 flex items-center">
        <button onClick={onMenuClick} className="lg:hidden mr-4 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <div className="flex items-center text-gray-700">
            {icon}
            <h2 className="text-xl font-semibold ml-3">{title}</h2>
        </div>
    </header>
);

interface ProfileModalProps { onClose: () => void; user: User; plan: SubscriptionPlan; }
export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, user, plan }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Profilo Utente</h2>
            <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-3xl mr-4">{user.name.charAt(0)}</div>
                <div>
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </div>
            <div className="space-y-2">
                <p><strong>Piano di Abbonamento:</strong> <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{plan}</span></p>
                <p><strong>ID Utente:</strong> {user.id}</p>
            </div>
            <button onClick={onClose} className="mt-6 w-full bg-gray-200 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-300">Chiudi</button>
        </div>
    </div>
);

// =================================================================
// View Components
// =================================================================
interface ViewProps { weatherData: WeatherDay[] | null; weatherLoading: boolean; weatherError: string | null; }
interface DashboardProps extends ViewProps { setActiveView: (view: NavItemType, tab?: string | null) => void; user: User | null; plan: SubscriptionPlan; tasks: Task[]; setTasks: (tasks: Task[]) => void; }
export const Dashboard: React.FC<DashboardProps> = ({ setActiveView, user, plan, tasks }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Ciao, {user?.name}!</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h2 className="font-bold text-xl mb-4">Panoramica</h2>
                    <p>Benvenuto nel tuo orto digitale. Da qui puoi gestire tutte le attività.</p>
                </Card>
                <Card>
                    <h2 className="font-bold text-xl mb-4">Check List</h2>
                    <p>Hai {tasks.filter(t => !t.completed).length} attività da completare.</p>
                    <button onClick={() => setActiveView('Check List')} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">Vai alle attività</button>
                </Card>
                 <Card>
                    <h2 className="font-bold text-xl mb-4">Community</h2>
                    <p>Condividi i tuoi successi e chiedi consigli.</p>
                    <button onClick={() => setActiveView('Community', 'forum')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Unisciti alla Community</button>
                </Card>
                 <Card>
                    <h2 className="font-bold text-xl mb-4">Progetta Orto</h2>
                     {!isFeatureAllowed(SubscriptionPlan.PRO, plan) ? (
                        <>
                            <p className="text-gray-500">Passa a Pro per sbloccare la progettazione 3D.</p>
                            <button onClick={() => setActiveView('Upgrade')} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg">Fai l'Upgrade</button>
                        </>
                     ) : (
                        <>
                            <p>Crea il layout perfetto per il tuo spazio.</p>
                            <button onClick={() => setActiveView('Progetta il tuo Orto')} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg">Inizia a Progettare</button>
                        </>
                     )}
                </Card>
            </div>
        </div>
    );
};

export const YourVegetables: React.FC = () => <PlaceholderView title="I miei ortaggi" />;
export const AgroGardener: React.FC = () => <PlaceholderView title="Il tuo AgroGiardiniere" />;
export const CashFlow: React.FC = () => <PlaceholderView title="Entrate/Uscite" />;
export const Harvests: React.FC = () => <PlaceholderView title="Raccolti" />;
export const Ecommerce: React.FC = () => <PlaceholderView title="E-Commerce" />;
export const Faq: React.FC = () => <PlaceholderView title="FAQ" />;

interface CommunityProps { initialTab: string | null; user: User | null; }
export const Community: React.FC<CommunityProps> = ({ initialTab, user }) => (
    <Card>
        <h1 className="text-2xl font-bold">Community</h1>
        <p className="mt-2">Benvenuto {user?.name}! Tab iniziale: {initialTab || 'Nessuno'}</p>
        <PlaceholderView title="Sezione Community"/>
    </Card>
);


interface DesignGardenProps { latitude?: number | null; longitude?: number | null; }
export const DesignGarden: React.FC<DesignGardenProps> = ({ latitude, longitude }) => (
     <Card>
        <h1 className="text-2xl font-bold">Progetta il tuo Orto</h1>
        <p className="mt-2">Posizione: Lat {latitude?.toFixed(4)}, Lon {longitude?.toFixed(4)}</p>
        <PlaceholderView title="Strumento di Progettazione"/>
    </Card>
);


interface ChecklistProps { suggestions: TaskSuggestion[]; tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }
export const Checklist: React.FC<ChecklistProps> = ({ suggestions, tasks, setTasks }) => {
    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <Card>
                    <h1 className="text-2xl font-bold mb-4">Check List Attività</h1>
                    <ul className="space-y-3">
                        {tasks.map(task => (
                            <li key={task.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                <span className={`ml-3 flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${task.priority === 'Alta' ? 'bg-red-100 text-red-800' : task.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{task.priority}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
            <div>
                <Card>
                    <h2 className="text-xl font-bold mb-4">Suggerimenti</h2>
                    {suggestions.length > 0 ? (
                         <ul className="space-y-3">
                            {suggestions.map(s => (
                                <li key={s.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="font-semibold text-blue-800">{s.text}</p>
                                    <p className="text-sm text-blue-600 mt-1">{s.reason}</p>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-gray-500">Nessun suggerimento per oggi.</p>}
                </Card>
            </div>
        </div>
    );
};

interface WeatherProps extends ViewProps { latitude?: number | null; longitude?: number | null; }
export const Weather: React.FC<WeatherProps> = ({ weatherData, weatherLoading, weatherError, latitude, longitude }) => {
    if (weatherLoading) return <div className="flex justify-center items-center h-64"><Spinner/></div>;
    if (weatherError) return <Card><p className="text-red-500">{weatherError}</p></Card>;

    return (
        <Card>
            <h1 className="text-2xl font-bold mb-4">Meteo Settimanale</h1>
            <p className="mb-6 text-gray-500">Località: {latitude?.toFixed(4)}, {longitude?.toFixed(4)}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
                {weatherData?.map(day => (
                    <div key={day.day} className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-bold">{day.day}</p>
                        <p className="text-3xl font-bold my-2">{day.temp}°</p>
                        <p className="text-sm text-gray-500">{day.tempMin}°</p>
                        <p className="text-sm text-blue-500 mt-2">{day.rainChance}% 💧</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export const UpgradeView: React.FC<{ plan: SubscriptionPlan }> = ({ plan }) => (
    <Card className="text-center">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">Funzionalità Premium</h1>
        <p className="text-lg text-gray-700 mb-2">Questa funzionalità non è inclusa nel tuo piano <span className="font-bold">{plan}</span>.</p>
        <p className="text-gray-600 mb-6">Fai l'upgrade a un piano superiore per sbloccare questo e molto altro!</p>
        <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors">
            Scopri i Piani
        </button>
    </Card>
);
