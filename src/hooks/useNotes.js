import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

export function useNotes() {
  const [notes, setNotes] = useLocalStorage('minddesk_notes', []);

  const addNote = (noteData) => {
    const newNote = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
      ...noteData
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() } : note));
  };

  return { notes, addNote, updateNote, deleteNote, togglePin };
}
