import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: '/my-vegetables',
      label: 'I Miei Ortaggi',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      to: '/calendar',
      label: 'Calendario',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      to: '/monitoring',
      label: 'Monitoraggio',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      to: '/guides',
      label: 'Guide',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 pt-16">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-4 hover:bg-gray-50 transition flex items-center justify-center border-b"
          >
            <svg
              className={`w-6 h-6 text-gray-600 transition-transform ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>

          {/* User Info */}
          {isSidebarOpen && user && (
            <div className="p-4 border-b border-gray-200 bg-agro-green/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-agro-green flex items-center justify-center text-white font-bold">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
                  <p className="text-xs text-gray-500">Coltivatore</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 transition ${
                  isActive(item.to)
                    ? 'bg-agro-green text-white border-r-4 border-agro-lime'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${!isSidebarOpen ? 'justify-center' : ''}`}
                title={!isSidebarOpen ? item.label : ''}
              >
                <span className={isActive(item.to) ? 'text-white' : 'text-gray-600'}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition ${
                !isSidebarOpen ? 'justify-center' : ''
              }`}
              title={!isSidebarOpen ? 'Logout' : ''}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {isSidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
