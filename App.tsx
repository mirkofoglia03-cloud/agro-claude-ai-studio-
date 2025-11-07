
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar, Header, Dashboard, YourVegetables, Checklist, Weather, Ecommerce, DesignGarden, AgroGardener, CashFlow, Harvests, Community, Faq, ProfileModal, Subscription, Registration, UpgradeView } from './components';
import { NAV_ITEMS, MOCK_TASKS } from './constants';
import type { NavItemType, TaskSuggestion, User, Task } from './types';
import { SubscriptionPlan } from './types';
import { generateTaskSuggestions, isFeatureAllowed } from './services';
import { useWeather, useWeatherNotifications } from './hooks';

// =================================================================
// ERROR BOUNDARY COMPONENT
// =================================================================
interface ErrorBoundaryProps { children: React.ReactNode; }
interface ErrorBoundaryState { hasError: boolean; error: Error | null; }

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
          <div className="text-center max-w-md p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Ops! Qualcosa è andato storto</h1>
            <p className="text-gray-600 mb-6">Si è verificato un errore imprevisto. Ricarica la pagina per riprovare.</p>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Ricarica Pagina
            </button>
            {this.state.error && (
              <details className="mt-6 text-left text-xs text-gray-500">
                <summary className="cursor-pointer mb-2">Dettagli tecnici</summary>
                <pre className="bg-gray-100 p-4 rounded overflow-auto">{this.state.error.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// =================================================================
// MAIN APPLICATION COMPONENT
// =================================================================
type AppState = 'choosing_plan' | 'registering' | 'loggedIn' | 'loading';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<NavItemType>('Il mio Orto');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [taskSuggestions, setTaskSuggestions] = useState<TaskSuggestion[]>([]);
  const [initialCommunityTab, setInitialCommunityTab] = useState<string | null>(null);

  const [appState, setAppState] = useState<AppState>('loading');
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  
  const { weatherData, weatherLoading, weatherError, location } = useWeather(appState);
  useWeatherNotifications(weatherData);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('agroUser');
    const storedPlan = localStorage.getItem('agroPlan');
    if (storedUser && storedPlan) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.id && parsedUser.name && parsedUser.email) {
          setUser(parsedUser);
          setPlan(storedPlan as SubscriptionPlan);
          setAppState('loggedIn');
        } else {
          throw new Error('Invalid user data in storage');
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('agroUser');
        localStorage.removeItem('agroPlan');
        setAppState('choosing_plan');
      }
    } else {
        setAppState('choosing_plan');
    }
  }, []);

  useEffect(() => {
    if (weatherData) {
      try {
        setTaskSuggestions(generateTaskSuggestions(weatherData));
      } catch (err) {
        console.error('Error generating task suggestions:', err);
        setTaskSuggestions([]);
      }
    }
  }, [weatherData]);

  const handleSelectPlan = useCallback((selectedPlan: SubscriptionPlan) => {
    setPlan(selectedPlan);
    setAppState('registering');
  }, []);

  const handleRegister = useCallback((userData: Omit<User, 'id' | 'lat' | 'lng'>) => {
    const newUser: User = { ...userData, id: Date.now(), lat: 41.9028, lng: 12.4964 };
    setUser(newUser);
    localStorage.setItem('agroUser', JSON.stringify(newUser));
    if (plan) {
      localStorage.setItem('agroPlan', plan);
    }
    setAppState('loggedIn');
  }, [plan]);
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem('agroUser');
    localStorage.removeItem('agroPlan');
    setUser(null);
    setPlan(null);
    setAppState('choosing_plan');
    setActiveView('Il mio Orto');
  }, []);

  const handleNavClick = useCallback((view: NavItemType, tab: string | null = null) => {
    const targetItem = NAV_ITEMS.find(item => item.name === view);
    if (plan && targetItem && !isFeatureAllowed(targetItem.plan, plan)) {
      setActiveView('Upgrade');
    } else {
      setActiveView(view);
    }

    if (view === 'Community' && tab) {
      setInitialCommunityTab(tab);
    } else {
      setInitialCommunityTab(null);
    }
    setSidebarOpen(false);
  }, [plan]);

  const renderContent = useCallback(() => {
    if (!plan) return null;

    const commonProps = { weatherData, weatherLoading, weatherError };

    switch (activeView) {
      case 'Il mio Orto':
        return <Dashboard setActiveView={handleNavClick} {...commonProps} user={user} plan={plan} tasks={tasks} setTasks={setTasks} />;
      case 'I miei ortaggi': return <YourVegetables />;
      case 'Check List': return <Checklist suggestions={taskSuggestions} tasks={tasks} setTasks={setTasks} />;
      case 'Meteo': return <Weather {...commonProps} latitude={location?.lat} longitude={location?.lon} />;
      case 'Progetta il tuo Orto': return <DesignGarden latitude={location?.lat} longitude={location?.lon} />;
      case 'Il tuo AgroGiardiniere': return <AgroGardener />;
      case 'Entrate/Uscite': return <CashFlow />;
      case 'Raccolti': return <Harvests />;
      case 'Community': return <Community initialTab={initialCommunityTab} user={user} />;
      case 'E-Commerce': return <Ecommerce />;
      case 'Faq': return <Faq />;
      case 'Upgrade': return <UpgradeView plan={plan} />;
      default:
        return <Dashboard setActiveView={handleNavClick} {...commonProps} user={user} plan={plan} tasks={tasks} setTasks={setTasks} />;
    }
  }, [activeView, plan, weatherData, weatherLoading, weatherError, location, taskSuggestions, tasks, user, initialCommunityTab, handleNavClick]);
  
  if (appState === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (appState === 'choosing_plan') {
    return <Subscription onSelectPlan={handleSelectPlan} />;
  }
  if (appState === 'registering') {
    return <Registration onRegister={handleRegister} plan={plan!} onBack={() => setAppState('choosing_plan')} />;
  }
  if (appState !== 'loggedIn' || !user || !plan) {
    return null; // Should be handled by loading/onboarding states
  }

  const activeNavItem = NAV_ITEMS.find(item => item.name === activeView);
  const Icon = activeNavItem?.icon;

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
        <Sidebar 
          activeView={activeView} 
          onNavClick={handleNavClick} 
          isOpen={isSidebarOpen} 
          setOpen={setSidebarOpen} 
          onProfileClick={() => setProfileModalOpen(true)}
          user={user}
          plan={plan}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col">
          <Header 
            title={activeNavItem?.name || 'Il mio Orto'} 
            icon={Icon ? <Icon className="w-6 h-6" /> : null}
            onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
          />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div key={activeView} className="fade-in">
              {renderContent()}
            </div>
          </main>
        </div>
        {isProfileModalOpen && <ProfileModal onClose={() => setProfileModalOpen(false)} user={user} plan={plan} />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
