import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { isToday, isTomorrow, isThisWeek, isFuture, parseISO } from 'date-fns';
import { CheckCircle2, Circle } from 'lucide-react';

export default function Planner() {
  const { tasks, toggleTask } = useTasks();
  const location = useLocation();

  const navLinks = [
    { name: 'Today', path: '' },
    { name: 'Tomorrow', path: 'tomorrow' },
    { name: 'This Week', path: 'week' },
    { name: 'Upcoming', path: 'upcoming' },
  ];

  return (
    <div className="planner-page animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Planner</h1>
        <p style={{ color: 'var(--text-muted)' }}>Focus on what matters, when it matters.</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px', overflowX: 'auto' }}>
        {navLinks.map(link => {
          const isActive = location.pathname === `/planner${link.path ? '/' + link.path : ''}` || (link.path === '' && location.pathname === '/planner');
          return (
            <NavLink
              key={link.name}
              to={`/planner/${link.path}`}
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

      <div className="planner-content">
        <Routes>
          <Route path="" element={<PlannerList title="Today's Tasks" tasks={tasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate)))} onToggle={toggleTask} />} />
          <Route path="tomorrow" element={<PlannerList title="Tomorrow's Tasks" tasks={tasks.filter(t => t.dueDate && isTomorrow(parseISO(t.dueDate)))} onToggle={toggleTask} />} />
          <Route path="week" element={<PlannerList title="This Week" tasks={tasks.filter(t => t.dueDate && isThisWeek(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate)) && !isTomorrow(parseISO(t.dueDate)))} onToggle={toggleTask} />} />
          <Route path="upcoming" element={<PlannerList title="Future Tasks" tasks={tasks.filter(t => t.dueDate && isFuture(parseISO(t.dueDate)) && !isThisWeek(parseISO(t.dueDate)))} onToggle={toggleTask} />} />
        </Routes>
      </div>
    </div>
  );
}

function PlannerList({ title, tasks, onToggle }) {
  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>{title} ({tasks.length})</h3>
      {!tasks.length ? (
         <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Looks clear! No tasks scheduled.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate)).map(task => (
            <div key={task.id} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <button onClick={() => onToggle(task.id)} style={{ color: task.completed ? 'var(--success-color)' : 'var(--text-muted)' }}>
                {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
              <div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.7 : 1 }}>
                <div style={{ fontWeight: 500 }}>{task.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Priority: {task.priority}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
