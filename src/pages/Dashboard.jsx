import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { useNotes } from '../hooks/useNotes';
import { useGoals } from '../hooks/useGoals';
import { useSettings } from '../hooks/useSettings';
import { format, isToday } from 'date-fns';
import { CheckCircle2, Circle, Clock, FileText, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { tasks, toggleTask } = useTasks();
  const { notes } = useNotes();
  const { goals } = useGoals();
  const { settings } = useSettings();

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const todaysTasks = tasks.filter(t => t.dueDate && isToday(new Date(t.dueDate)));
  const recentNotes = notes.slice(0, 3);
  
  return (
    <div className="dashboard animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {settings.username}!
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your projects today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Tasks Progress</h3>
            <CheckCircle2 color="var(--primary-color)" size={24} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            {completionPercent}%
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${completionPercent}%`, height: '100%', backgroundColor: 'var(--primary-color)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>{completedTasks} completed</span>
            <span>{totalTasks - completedTasks} pending</span>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Active Goals</h3>
            <Target color="var(--warning-color)" size={24} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            {goals.length}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Keep up the good work!</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>Total Notes</h3>
            <FileText color="var(--success-color)" size={24} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            {notes.length}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Ideas captured</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Today's Tasks</h2>
            <Link to="/tasks/today" style={{ fontSize: '14px', color: 'var(--primary-color)' }}>View all</Link>
          </div>
          {todaysTasks.length === 0 ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              No tasks due today.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {todaysTasks.slice(0, 5).map(task => (
                <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <button onClick={() => toggleTask(task.id)} style={{ color: task.completed ? 'var(--success-color)' : 'var(--text-muted)' }}>
                    {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                  <div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'inherit' }}>
                    {task.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Recent Notes</h2>
            <Link to="/notes" style={{ fontSize: '14px', color: 'var(--primary-color)' }}>View all</Link>
          </div>
          {recentNotes.length === 0 ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              No recent notes.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentNotes.map(note => (
                <Link to="/notes" key={note.id} style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '16px', backgroundColor: 'var(--bg-main)', borderRadius: '8px', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid transparent' }} 
                       onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                       onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'none'; }}>
                    <h4 style={{ fontWeight: '500', marginBottom: '4px', color: 'var(--text-main)' }}>{note.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {format(new Date(note.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
