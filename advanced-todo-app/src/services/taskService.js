// Task service with localStorage persistence
export const loadTasks = () => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      return tasks;
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return [];
    }
  };
  
  export const saveTasks = (tasks) => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Failed to save tasks:', error);
      return false;
    }
  };
  
  export const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push(task);
    return saveTasks(tasks);
  };
  
  export const deleteTask = (taskId) => {
    const tasks = loadTasks().filter(task => task.id !== taskId);
    return saveTasks(tasks);
  };
  
  export const updateTask = (taskId, updates) => {
    const tasks = loadTasks().map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    return saveTasks(tasks);
  };