import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';

export default function NoteEditor({ note, onUpdate, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Local state for instant typing response
  const [title, setTitle] = useState(note?.title || '');
  const [category, setCategory] = useState(note?.category || 'General');
  const [content, setContent] = useState(note?.content || '');
  
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(note?.updatedAt || new Date().toISOString());
  
  // Store refs to access latest values on unmount
  const stateRef = useRef({ title, category, content, id: note?.id });

  // Compute character and word count
  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Track latest state for the unmount hook
  useEffect(() => {
    stateRef.current = { title, category, content, id: note?.id };
  }, [title, category, content, note?.id]);

  // The actual save function
  const triggerSave = useCallback((t, c, cat) => {
    setIsSaving(true);
    onUpdate({ title: t, content: c, category: cat });
    setLastSaved(new Date().toISOString());
    
    // Simulate slight delay to show "Saving..." indicator to the user
    setTimeout(() => setIsSaving(false), 500);
  }, [onUpdate]);

  // Optional: Auto-save debouncer. Runs whenever user stops typing for 500ms.
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only Trigger save if actual changes exist.
      if (
        title !== note?.title ||
        category !== note?.category ||
        content !== note?.content
      ) {
        triggerSave(title, content, category);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [title, content, category, triggerSave, note]);

  // Protection: Save immediately if unmounted (e.g. user clicks close fast)
  useEffect(() => {
    return () => {
      const { title: t, category: cat, content: c, id } = stateRef.current;
      if (t !== note?.title || cat !== note?.category || c !== note?.content) {
        // Warning: React strict mode might fire this twice in dev, but it's safe.
        onUpdate({ title: t, content: c, category: cat });
      }
    };
  }, [onUpdate, note]);

  // If user hits Escape, close it
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" style={{ zIndex: 100 }}>
      <div 
        className="modal-content animate-fade-in" 
        style={{ 
          maxWidth: isFullscreen ? '100vw' : '800px',
          height: isFullscreen ? '100vh' : '85vh',
          width: isFullscreen ? '100vw' : '100%',
          maxHeight: isFullscreen ? '100vh' : 'calc(100vh - 32px)',
          margin: isFullscreen ? '0' : 'auto',
          borderRadius: isFullscreen ? '0' : 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          padding: '0' // We'll manage padding inside
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <p style={{ fontSize: '13px', color: isSaving ? 'var(--primary-color)' : 'var(--text-muted)', transition: 'color 0.3s' }}>
                {isSaving ? 'Saving...' : 'Saved'}
             </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="icon-btn" onClick={() => setIsFullscreen(!isFullscreen)} title="Toggle Fullscreen">
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button className="icon-btn" onClick={onClose} title="Close Note (Auto-saved)"><X size={20} /></button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Note Title" 
            autoFocus
            style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              border: 'none', 
              background: 'transparent', 
              color: 'var(--text-main)',
              outline: 'none',
              marginBottom: '16px',
              fontFamily: 'inherit'
            }} 
          />
          
          <input 
            type="text" 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            placeholder="Category (e.g. Personal)" 
            style={{ 
              fontSize: '14px', 
              border: 'none', 
              background: 'var(--bg-main)', 
              color: 'var(--text-muted)',
              outline: 'none',
              marginBottom: '24px',
              padding: '4px 12px',
              borderRadius: '16px',
              width: 'fit-content',
              fontFamily: 'inherit'
            }} 
          />

          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)}
            placeholder="Start writing..."
            style={{ 
              flex: 1,
              resize: 'none',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-main)',
              outline: 'none',
              fontSize: '16px',
              lineHeight: '1.6',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
          <div>{wordCount} words &middot; {charCount} characters</div>
          <div>Last edited {new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>
    </div>
  );
}
