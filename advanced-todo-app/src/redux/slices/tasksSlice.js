import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
      }
    },
  },
})

export const { addTask, deleteTask, toggleComplete } = tasksSlice.actions
export default tasksSlice.reducer