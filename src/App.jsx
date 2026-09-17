import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Planner from './pages/Planner';
import Notes from './pages/Notes';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import QuickAddModal from './components/QuickAddModal';
import { useState } from 'react';

function App() {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  return (
    <Router>
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
    </Router>
  );
}

export default App;
