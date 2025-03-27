import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: {},
  loading: false,
  error: null
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false
      state.data[action.payload.location] = action.payload.weather
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    clearWeatherError: (state) => {
      state.error = null
    }
  }
})

export const { 
  fetchWeatherStart, 
  fetchWeatherSuccess, 
  fetchWeatherFailure,
  clearWeatherError
} = weatherSlice.actions

export const fetchWeather = (location) => async (dispatch) => {
  if (!location) return
  
  try {
    dispatch(fetchWeatherStart())
    dispatch(clearWeatherError())
    
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: location,
        appid: import.meta.env.VITE_WEATHER_API_KEY,
        units: 'metric'
      }
    })
    
    const weatherData = {
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      city: response.data.name
    }
    
    dispatch(fetchWeatherSuccess({
      location,
      weather: weatherData
    }))
  } catch (error) {
    dispatch(fetchWeatherFailure(error.response?.data?.message || error.message))
  }
}

export default weatherSlice.reducer