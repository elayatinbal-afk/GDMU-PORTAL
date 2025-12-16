import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">טוען נתונים...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
    const location = useLocation();
    
    // Determine title based on path
    let title = "לוח בקרה";
    if (location.pathname.includes('/reports')) title = "ספריית דוחות";
    if (location.pathname.includes('/admin')) title = "ניהול מערכת";

    return (
        <div className="flex min-h-screen bg-slate-50" dir="rtl">
            <Sidebar />
            {/* Margin right 64 to accommodate fixed right sidebar */}
            <div className="mr-64 flex-1 flex flex-col">
                <Header title={title} />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/reports/:category" element={
            <ProtectedRoute>
              <Layout>
                 <Reports />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/upload" element={
            <ProtectedRoute>
              <Layout>
                <Admin />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Catch all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;