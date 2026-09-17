import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

export function useGoals() {
  const [goals, setGoals] = useLocalStorage('minddesk_goals', []);

  const addGoal = (goalData) => {
    const newGoal = {
      id: uuidv4(),
      progress: 0,
      createdAt: new Date().toISOString(),
      ...goalData
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id, updates) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, ...updates } : goal));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return { goals, addGoal, updateGoal, deleteGoal };
}
