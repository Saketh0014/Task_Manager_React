 import React, { useState } from 'react';

function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'Medium');
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleToggleComplete = () => {
    const confirmMsg = task.completed
      ? 'Mark this task as not completed?'
      : 'Mark this task as completed?';
    if (window.confirm(confirmMsg)) {
      updateTask({ ...task, completed: !task.completed });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert('Title is required.');
      return;
    }
    updateTask({
      ...task,
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate || null,
    });
    setIsEditing(false);
  };

  const createdDate = new Date(task.createdAt).toLocaleString();
  const dueDateFormatted = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;

  const priorityColors = {
    High: '#e74c3c',
    Medium: '#e67e22',
    Low: '#2ecc71',
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        aria-label="Toggle task completion"
      />
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            className="task-edit-input"
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="task-edit-input"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="task-select"
            aria-label="Select task priority"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="task-edit-input"
            aria-label="Select due date"
          />
          <button onClick={handleSave} className="task-save-button">Save</button>
          <button onClick={() => setIsEditing(false)} className="task-cancel-button">Cancel</button>
        </div>
      ) : (
        <div className="task-details" onDoubleClick={() => setIsEditing(true)}>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <div className="task-meta">
            <span
              className="task-priority"
              style={{ color: priorityColors[task.priority] || '#000' }}
              aria-label={`Priority: ${task.priority}`}
            >
              {task.priority} Priority
            </span>
            {dueDateFormatted && (
              <span className="task-due-date" aria-label={`Due date: ${dueDateFormatted}`}>
                Due: {dueDateFormatted}
              </span>
            )}
          </div>
          <small>Created: {createdDate}</small>
          <button onClick={() => setIsEditing(true)} className="task-edit-button" aria-label="Edit task">Edit</button>
          <button onClick={handleDelete} className="task-delete-button" aria-label="Delete task">Delete</button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
