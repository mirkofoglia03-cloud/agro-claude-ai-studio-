import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardHomePage from './pages/DashboardHomePage';
import MyVegetablesPage from './pages/MyVegetablesPage';
import CalendarPage from './pages/CalendarPage';
import MonitoringPage from './pages/MonitoringPage';
import GuidesPage from './pages/GuidesPage';
import MapPage from './pages/MapPage';
import WeatherPage from './pages/WeatherPage';
import PhotoMonitoringPage from './pages/PhotoMonitoringPage';

const App: React.FC = (): JSX.Element => {
  return (
    <Router basename="/agro-claude-ai-studio-">
      <AuthProvider>
        <Routes>
          {/* Pagine pubbliche con Header e Footer */}
          <Route
            path="/"
            element={
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <HomePage />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <LoginPage />
                </main>
                <Footer />
              </div>
            }
          />

          {/* Pagine protette con Dashboard Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <DashboardHomePage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-vegetables"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <MyVegetablesPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <CalendarPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitoring"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <MonitoringPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <GuidesPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <MapPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <WeatherPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/photo-monitoring"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <PhotoMonitoringPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
