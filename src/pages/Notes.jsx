import { createPortal } from 'react-dom';
import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { format } from 'date-fns';
import { Plus, Trash2, Search, Pin, PinOff } from 'lucide-react';
import NoteEditor from '../components/NoteEditor';

export default function Notes() {
  const { notes, addNote, updateNote, deleteNote, togglePin } = useNotes();
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (note) => setEditingNote(note);
  const closeEdit = () => setEditingNote(null);

  const handleUpdateNote = (updatedData) => {
    if (editingNote.id === 'new') {
      const tempId = Date.now().toString(); 
      addNote({ id: tempId, ...updatedData });
      setEditingNote({ ...editingNote, id: tempId, ...updatedData }); 
    } else {
      updateNote(editingNote.id, updatedData);
    }
  };

  const filteredNotes = notes.filter(n => 
    (n.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (n.content || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (n.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const unpinnedNotes = filteredNotes.filter(n => !n.pinned);
  const displayedNotes = [...pinnedNotes, ...unpinnedNotes];

  return (
    <div className="notes-page animate-fade-in">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Notes</h1>
        
        <div style={{ display: 'flex', gap: '16px', flex: 1, justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative', maxWidth: '300px', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <button className="btn btn-primary" onClick={() => setEditingNote({ id: 'new', title: '', content: '', category: 'General' })}>
            <Plus size={18} /> New Note
          </button>
        </div>
      </div>

      {!notes.length && !searchQuery ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '8px' }}>No notes yet</h3>
          <p>Click "New Note" to capture your ideas.</p>
        </div>
      ) : displayedNotes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          <p>No notes found matching "{searchQuery}".</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {displayedNotes.map(note => (
            <div 
              key={note.id} 
              className="card hoverable-card" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                position: 'relative', 
                cursor: 'pointer', 
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: note.pinned ? '1px solid var(--primary-color)' : '1px solid var(--border-color)'
              }}
              onClick={() => handleEdit(note)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            >
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                <button 
                  className="icon-btn" 
                  onClick={(e) => { e.stopPropagation(); togglePin(note.id); }} 
                  style={{ width: '30px', height: '30px', color: note.pinned ? 'var(--primary-color)' : 'var(--text-muted)' }}
                  title={note.pinned ? "Unpin Note" : "Pin Note"}
                >
                  {note.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                </button>
                <button 
                  className="icon-btn" 
                  onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} 
                  style={{ width: '30px', height: '30px', color: 'var(--danger-color)' }}
                  title="Delete Note"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', paddingRight: '70px' }}>{note.title || 'Untitled Note'}</h3>
              <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '12px', backgroundColor: 'var(--bg-main)', color: 'var(--text-muted)' }}>{note.category}</span>
              
              <p style={{ color: 'var(--text-main)', fontSize: '14px', whiteSpace: 'pre-wrap', flex: 1, marginBottom: '16px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' }}>
                {note.content || "Empty note..."}
              </p>
              
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Updated {format(new Date(note.updatedAt), 'MMM d, yyyy')}
              </div>
            </div>
          ))}
        </div>
      )}

      {editingNote && createPortal(
        <NoteEditor 
          note={editingNote} 
          onUpdate={handleUpdateNote} 
          onClose={closeEdit}
        />,
        document.body
      )}
    </div>
  );
}
