import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('minddesk_tasks', []);

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      completed: false,
      createdAt: new Date().toISOString(),
      ...taskData
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return { tasks, addTask, updateTask, toggleTask, deleteTask };
}
