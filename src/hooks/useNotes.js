import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(collection(db, 'users', currentUser.uid, 'notes'), (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    });
    return unsubscribe;
  }, [currentUser]);

  const addNote = async (noteData) => {
    if (!currentUser) return;
    const noteId = uuidv4();
    await setDoc(doc(db, 'users', currentUser.uid, 'notes', noteId), {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
      ...noteData
    });
  };

  const updateNote = async (id, updates) => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid, 'notes', id), {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  };

  const deleteNote = async (id) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'notes', id));
  };

  const togglePin = async (id) => {
    if (!currentUser) return;
    const note = notes.find(n => n.id === id);
    if (note) await updateDoc(doc(db, 'users', currentUser.uid, 'notes', id), { pinned: !note.pinned, updatedAt: new Date().toISOString() });
  };

  return { notes, addNote, updateNote, deleteNote, togglePin };
}
