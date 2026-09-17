import React, { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import { Save } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings, toggleTheme } = useSettings();
  const [username, setUsername] = useState(settings.username);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({ username });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all your data? This action cannot be undone.")) {
      window.localStorage.removeItem('minddesk_tasks');
      window.localStorage.removeItem('minddesk_notes');
      window.localStorage.removeItem('minddesk_goals');
      // reload to clear state
      window.location.reload();
    }
  };

  return (
    <div className="settings-page animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your preferences and data.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Profile Settings</h2>
        
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Display Name</label>
            <input 
              type="text" 
              className="input-field" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>
            <Save size={18} /> Save Settings
          </button>
          {saved && <span style={{ marginLeft: '12px', color: 'var(--success-color)', fontSize: '14px' }}>Saved successfully!</span>}
        </form>
      </div>

      <div className="card" style={{ maxWidth: '600px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Appearance</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 500 }}>Dark Theme</div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Switch between light and dark mode colors.</div>
          </div>
          <button 
            className={`btn ${settings.theme === 'dark' ? 'btn-primary' : 'btn-ghost'}`} 
            onClick={toggleTheme}
            style={{ border: settings.theme === 'dark' ? 'none' : '1px solid var(--border-color)' }}
          >
            {settings.theme === 'dark' ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '600px', border: '1px solid var(--danger-color)', backgroundColor: 'transparent' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--danger-color)' }}>Danger Zone</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>Permanently delete all your tasks, notes, and goals from this browser.</p>
        
        <button className="btn btn-danger" onClick={handleClearData}>
          Clear All Data
        </button>
      </div>
    </div>
  );
}
