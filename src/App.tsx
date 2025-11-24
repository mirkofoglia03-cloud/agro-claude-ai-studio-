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
import SeedlingPage from './pages/SeedlingPage';
import CalendarPage from './pages/CalendarPage';
import MonitoringPage from './pages/MonitoringPage';
import GuidesPage from './pages/GuidesPage';
import MyGardenPage from './pages/MyGardenPage';
import ChecklistPage from './pages/ChecklistPage';
import WeatherPage from './pages/WeatherPage';
import HarvestsPage from './pages/HarvestsPage';
import IncomeExpensesPage from './pages/IncomeExpensesPage';
import DesignGardenPage from './pages/DesignGardenPage';
import AgroGardenerPage from './pages/AgroGardenerPage';
import CommunityPage from './pages/CommunityPage';
import EcommercePage from './pages/EcommercePage';
import FaqPage from './pages/FaqPage';
import AgentDemo from './pages/AgentDemo';

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
            path="/seedling"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <SeedlingPage />
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
            path="/my-garden"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <MyGardenPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checklist"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <ChecklistPage />
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
            path="/harvests"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <HarvestsPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/income-expenses"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <IncomeExpensesPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/design-garden"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <DesignGardenPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agro-gardener"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <AgroGardenerPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <CommunityPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ecommerce"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <EcommercePage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Header />
                  <DashboardLayout>
                    <FaqPage />
                  </DashboardLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agents"
            element={
              <ProtectedRoute>
                <AgentDemo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;