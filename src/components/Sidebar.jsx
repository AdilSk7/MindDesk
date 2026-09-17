import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, FileText, Target, Settings, X, Activity } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Planner', path: '/planner', icon: Calendar },
    { name: 'Notes', path: '/notes', icon: FileText },
    { name: 'Goals', path: '/goals', icon: Target },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <div className={clsx('sidebar-overlay', isOpen && 'open')} onClick={onClose} />
      <aside className={clsx('sidebar', isOpen && 'open')}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Activity className="logo-icon" />
            MindDesk
          </div>
          <button className="mobile-menu-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => clsx('nav-item', isActive && 'active')}
              onClick={onClose}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
