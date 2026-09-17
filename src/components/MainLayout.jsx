import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './MainLayout.css';

export default function MainLayout({ children, onQuickAdd }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Topbar onMenuClick={() => setSidebarOpen(true)} onQuickAdd={onQuickAdd} />
        
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
