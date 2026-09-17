import React from 'react';
import { Menu, Plus, Sun, Moon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useSettings } from '../hooks/useSettings';

export default function Topbar({ onMenuClick, onQuickAdd }) {
  const { settings, toggleTheme } = useSettings();
  const today = new Date();

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

        <div className="user-profile">
          <div className="avatar">
            {settings.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
