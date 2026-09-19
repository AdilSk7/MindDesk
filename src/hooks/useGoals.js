import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(collection(db, 'users', currentUser.uid, 'goals'), (snapshot) => {
      setGoals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    });
    return unsubscribe;
  }, [currentUser]);

  const addGoal = async (goalData) => {
    if (!currentUser) return;
    const goalId = uuidv4();
    await setDoc(doc(db, 'users', currentUser.uid, 'goals', goalId), {
      progress: 0,
      createdAt: new Date().toISOString(),
      ...goalData
    });
  };

  const updateGoal = async (id, updates) => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid, 'goals', id), updates);
  };

  const deleteGoal = async (id) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'goals', id));
  };

  return { goals, addGoal, updateGoal, deleteGoal };
}
