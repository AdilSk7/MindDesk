import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useNotes } from '../hooks/useNotes';
import { useGoals } from '../hooks/useGoals';

export default function QuickAddModal({ onClose }) {
  const [type, setType] = useState('task'); // task, note, goal
  const [title, setTitle] = useState('');
  
  const { addTask } = useTasks();
  const { addNote } = useNotes();
  const { addGoal } = useGoals();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (type === 'task') {
      const todayStr = new Date().toISOString().split('T')[0];
      addTask({ title, description: '', priority: 'Medium', category: 'General', dueDate: todayStr });
    } else if (type === 'note') {
      addNote({ title, content: '', category: 'General' });
    } else if (type === 'goal') {
      addGoal({ title, description: '', targetDate: '' });
    }
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div className="modal-header">
          <h2>Quick Add</h2>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="quick-add-types" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {['task', 'note', 'goal'].map(t => (
            <button 
              key={t}
              type="button"
              className={`btn ${type === t ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setType(t)}
              style={{ flex: 1, textTransform: 'capitalize' }}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              className="input-field" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`What's your new ${type}?`}
              autoFocus
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add {type}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
