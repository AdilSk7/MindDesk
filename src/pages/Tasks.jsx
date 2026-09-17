import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { CheckCircle2, Circle, Edit, Trash2, Calendar as CalIcon, Plus, X } from 'lucide-react';
import { isToday, isFuture, parseISO } from 'date-fns';

export default function Tasks() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEdit = (task) => setEditingTask(task);
  
  const closeEdit = () => setEditingTask(null);

  const saveEdit = (e) => {
    e.preventDefault();
    updateTask(editingTask.id, editingTask);
    closeEdit();
  };

  const navLinks = [
    { name: 'All Tasks', path: '' },
    { name: 'Today', path: 'today' },
    { name: 'Upcoming', path: 'upcoming' },
    { name: 'Completed', path: 'completed' },
  ];

  return (
    <div className="tasks-page animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Tasks</h1>
        <button className="btn btn-primary" onClick={() => setEditingTask({ id: 'new', title: '', priority: 'Medium', dueDate: '' })}>
          <Plus size={18} /> Add Task
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px', overflowX: 'auto' }}>
        {navLinks.map(link => {
          const isActive = location.pathname === `/tasks${link.path ? '/' + link.path : ''}` || (link.path === '' && location.pathname === '/tasks');
          return (
            <NavLink
              key={link.name}
              to={`/tasks/${link.path}`}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontWeight: '500',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                backgroundColor: isActive ? 'var(--primary-color)' : 'var(--bg-surface)',
                color: isActive ? 'white' : 'var(--text-muted)',
                border: isActive ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
              }}
            >
              {link.name}
            </NavLink>
          );
        })}
      </div>

      <div className="tasks-content">
        <Routes>
          <Route path="" element={<TaskList tasks={tasks} onEdit={handleEdit} onToggle={toggleTask} onDelete={deleteTask} />} />
          <Route path="today" element={<TaskList tasks={tasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate)) && !t.completed)} onEdit={handleEdit} onToggle={toggleTask} onDelete={deleteTask} />} />
          <Route path="upcoming" element={<TaskList tasks={tasks.filter(t => t.dueDate && isFuture(parseISO(t.dueDate)) && !t.completed)} onEdit={handleEdit} onToggle={toggleTask} onDelete={deleteTask} />} />
          <Route path="completed" element={<TaskList tasks={tasks.filter(t => t.completed)} onEdit={handleEdit} onToggle={toggleTask} onDelete={deleteTask} />} />
        </Routes>
      </div>

      {editingTask && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h2>{editingTask.id === 'new' ? 'New Task' : 'Edit Task'}</h2>
              <button className="icon-btn" onClick={closeEdit}><X size={20} /></button>
            </div>
            <form onSubmit={editingTask.id === 'new' ? (e) => { e.preventDefault(); addTask({ title: editingTask.title, priority: editingTask.priority, dueDate: editingTask.dueDate }); closeEdit(); } : saveEdit}>
              <div className="form-group">
                <label>Title</label>
                <input required type="text" className="input-field" value={editingTask.title || ''} onChange={e => setEditingTask({...editingTask, title: e.target.value})} autoFocus />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input type="date" className="input-field" value={editingTask.dueDate || ''} onChange={e => setEditingTask({...editingTask, dueDate: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select className="input-field" value={editingTask.priority || 'Medium'} onChange={e => setEditingTask({...editingTask, priority: e.target.value})}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                <button type="button" className="btn btn-ghost" onClick={closeEdit}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskList({ tasks, onEdit, onToggle, onDelete }) {
  if (!tasks.length) return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No tasks found in this view.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {tasks.map(task => (
        <div key={task.id} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => onToggle(task.id)} style={{ color: task.completed ? 'var(--success-color)' : 'var(--text-muted)' }}>
            {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
          </button>
          
          <div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.7 : 1 }}>
            <h4 style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>{task.title}</h4>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
              {task.dueDate && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CalIcon size={12}/> {task.dueDate}</span>}
              <span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="icon-btn" onClick={() => onEdit(task)}><Edit size={18} /></button>
            <button className="icon-btn" style={{ color: 'var(--danger-color)' }} onClick={() => onDelete(task.id)}><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
