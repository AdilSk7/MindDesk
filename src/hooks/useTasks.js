import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(collection(db, 'users', currentUser.uid, 'tasks'), (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    });
    return unsubscribe;
  }, [currentUser]);

  const addTask = async (taskData) => {
    if (!currentUser) return;
    const taskId = uuidv4();
    await setDoc(doc(db, 'users', currentUser.uid, 'tasks', taskId), {
      completed: false,
      createdAt: new Date().toISOString(),
      ...taskData
    });
  };

  const updateTask = async (id, updates) => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid, 'tasks', id), updates);
  };

  const toggleTask = async (id) => {
    if (!currentUser) return;
    const task = tasks.find(t => t.id === id);
    if (task) await updateDoc(doc(db, 'users', currentUser.uid, 'tasks', id), { completed: !task.completed });
  };

  const deleteTask = async (id) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'tasks', id));
  };

  return { tasks, addTask, updateTask, toggleTask, deleteTask };
}
