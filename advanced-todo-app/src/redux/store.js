import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import tasksReducer from './slices/tasksSlice'
import weatherReducer from './slices/weatherSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    weather: weatherReducer,
  },
})

export default store