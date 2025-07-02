export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (e) {
    console.error('Failed to load tasks from localStorage', e);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks to localStorage', e);
  }
};

export const loadUsername = () => {
  try {
    return localStorage.getItem('username') || '';
  } catch (e) {
    console.error('Failed to load username from localStorage', e);
    return '';
  }
};

export const saveUsername = (username) => {
  try {
    localStorage.setItem('username', username);
  } catch (e) {
    console.error('Failed to save username to localStorage', e);
  }
};
