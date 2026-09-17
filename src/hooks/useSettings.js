import { useLocalStorage } from './useLocalStorage';
import { useEffect } from 'react';

export function useSettings() {
  const [settings, setSettings] = useLocalStorage('minddesk_settings', {
    theme: 'light',
    username: 'User'
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  const updateSettings = (updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  return { settings, updateSettings, toggleTheme };
}
