import React, { useState, useEffect } from 'react';
import './styles/toggle.css';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
function App() {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  // Load username, tasks, and dark mode from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'false') {
      setDarkMode(false);
      document.body.classList.remove('dark-mode');
    } else {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save username to localStorage when it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleLogin = (name) => {
    setUsername(name);
  };

  const handleLogout = () => {
    setUsername('');
    setTasks([]);
    localStorage.removeItem('tasks');
  };

  const addTask = (task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  }).filter(task => {
    const term = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(term) ||
      (task.description && task.description.toLowerCase().includes(term))
    );
  });

  return (
    <div className={`app-container${darkMode ? ' dark' : ''}`}>
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="dashboard">
          <header>
            <h1>{username}'s Task Tracker</h1>
            <div className="header-controls">
              {/* Removed search input as per user request */}
              <label className="switch" aria-label="Toggle dark mode">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider round"></span>
              </label>
              <span className="toggle-label">{darkMode ? '🌙' : '☀️'}</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </header>
          <TaskForm addTask={addTask} />
          <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
          <TaskList
            tasks={filteredTasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      )}
    </div>
  );
}

export default App;
