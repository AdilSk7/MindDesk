import React from 'react';
import { Menu, Plus, Sun, Moon, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ onMenuClick, onQuickAdd }) {
  const { settings, toggleTheme } = useSettings();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const today = new Date();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error('Logout failed', e);
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h2 className="page-title">Workspace</h2>
      </div>

      <div className="topbar-right">
        <span className="date-display">{format(today, 'EEEE, MMMM d')}</span>
        
        <button className="btn btn-primary" onClick={onQuickAdd}>
          <Plus size={18} />
          <span>Quick Add</span>
        </button>

        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="btn btn-ghost" onClick={handleLogout} title="Sign Out" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
          <LogOut size={18} />
          <span style={{ fontSize: '13px' }}>Logout</span>
        </button>
      </div>
    </header>
  );
}
