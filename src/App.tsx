import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyVegetablesPage from './pages/MyVegetablesPage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import MonitoringPage from './pages/MonitoringPage';
import GuidesPage from './pages/GuidesPage';

const App: React.FC = (): JSX.Element => {
  return (
    <Router basename="/agro-claude-ai-studio-">
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Pagine pubbliche */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Pagine protette - Area "I Miei Ortaggi" */}
              <Route
                path="/my-vegetables"
                element={
                  <ProtectedRoute>
                    <MyVegetablesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <CalendarPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/monitoring"
                element={
                  <ProtectedRoute>
                    <MonitoringPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/guides"
                element={
                  <ProtectedRoute>
                    <GuidesPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
