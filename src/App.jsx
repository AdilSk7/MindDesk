import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Planner from './pages/Planner';
import Notes from './pages/Notes';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Login from './pages/Login';
import QuickAddModal from './components/QuickAddModal';
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/*" element={
            <PrivateRoute>
              <MainLayout onQuickAdd={() => setIsQuickAddOpen(true)}>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks/*" element={<Tasks />} />
                  <Route path="/planner/*" element={<Planner />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </MainLayout>
              
              {isQuickAddOpen && (
                <QuickAddModal onClose={() => setIsQuickAddOpen(false)} />
              )}
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
