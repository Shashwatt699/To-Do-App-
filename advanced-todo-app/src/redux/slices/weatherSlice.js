import { createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../../services/weatherService';

const initialState = {
  data: {},
  loading: false,
  error: null
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.data[action.payload.location] = action.payload.weather;
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearWeatherError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  fetchWeatherStart, 
  fetchWeatherSuccess, 
  fetchWeatherFailure,
  clearWeatherError
} = weatherSlice.actions;

export const getWeatherForLocation = (location) => async (dispatch) => {
  if (!location) return;
  
  try {
    dispatch(fetchWeatherStart());
    dispatch(clearWeatherError());
    
    const weather = await fetchWeather(location);
    
    dispatch(fetchWeatherSuccess({
      location,
      weather
    }));
  } catch (error) {
    dispatch(fetchWeatherFailure(error.message));
  }
};

export default weatherSlice.reducer;