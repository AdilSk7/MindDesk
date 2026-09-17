import React, { useState } from 'react';
import { useGoals } from '../hooks/useGoals';
import { Target, Plus, Edit3, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';

export default function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal } = useGoals();
  const [editingGoal, setEditingGoal] = useState(null);

  const handleEdit = (goal) => setEditingGoal(goal);
  const closeEdit = () => setEditingGoal(null);

  const saveEdit = (e) => {
    e.preventDefault();
    if (editingGoal.id === 'new') {
      addGoal({ title: editingGoal.title, description: editingGoal.description, targetDate: editingGoal.targetDate, progress: parseInt(editingGoal.progress) || 0 });
    } else {
      updateGoal(editingGoal.id, { title: editingGoal.title, description: editingGoal.description, targetDate: editingGoal.targetDate, progress: parseInt(editingGoal.progress) || 0 });
    }
    closeEdit();
  };

  return (
    <div className="goals-page animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Goals</h1>
        <button className="btn btn-primary" onClick={() => setEditingGoal({ id: 'new', title: '', description: '', targetDate: '', progress: 0 })}>
          <Plus size={18} /> New Goal
        </button>
      </div>

      {!goals.length ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
          <Target size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <h3>No Active Goals</h3>
          <p>Set a new goal to start tracking your progress.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {goals.map(goal => (
            <div 
              key={goal.id} 
              className="card hoverable-card" 
              style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => handleEdit(goal)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            >
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleEdit(goal); }} style={{ width: '30px', height: '30px' }}><Edit3 size={16}/></button>
                <button className="icon-btn" onClick={(e) => { e.stopPropagation(); deleteGoal(goal.id); }} style={{ width: '30px', height: '30px', color: 'var(--danger-color)' }}><Trash2 size={16}/></button>
              </div>
              
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', paddingRight: '70px' }}>{goal.title}</h3>
              
              <p style={{ color: 'var(--text-main)', fontSize: '14px', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {goal.description}
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${goal.progress}%`, height: '100%', backgroundColor: goal.progress === 100 ? 'var(--success-color)' : 'var(--primary-color)', transition: 'width 0.3s' }} />
                </div>
              </div>
              
              {goal.targetDate && (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Target: {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editingGoal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h2>{editingGoal.id === 'new' ? 'New Goal' : 'Goal Details'}</h2>
              <button className="icon-btn" onClick={closeEdit}><X size={20} /></button>
            </div>
            <form onSubmit={saveEdit}>
              <div className="form-group">
                <label>Title</label>
                <input required type="text" className="input-field" value={editingGoal.title} onChange={e => setEditingGoal({...editingGoal, title: e.target.value})} autoFocus />
              </div>
              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea className="input-field" rows={3} value={editingGoal.description} onChange={e => setEditingGoal({...editingGoal, description: e.target.value})} />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label>Target Date</label>
                  <input type="date" className="input-field" value={editingGoal.targetDate} onChange={e => setEditingGoal({...editingGoal, targetDate: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Progress (%)</label>
                  <input type="number" min="0" max="100" className="input-field" value={editingGoal.progress} onChange={e => setEditingGoal({...editingGoal, progress: e.target.value})} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                <button type="button" className="btn btn-ghost" onClick={closeEdit}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
