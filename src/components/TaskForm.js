import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      reminder: reminder || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setReminder('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        id="task-title"
        type="text"
        placeholder="Task title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="task-input"
      />
      <input
        id="task-desc"
        type="text"
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="task-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="task-select"
        aria-label="Select task priority"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="task-input"
        aria-label="Select due date"
      />
      <button type="submit" className="task-button">Add Task</button>
    </form>
  );
}

export default TaskForm;
