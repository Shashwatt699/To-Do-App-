import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'en'
      }
    });
    
    return {
      temp: Math.round(response.data.main.temp), // Rounded temperature
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      city: response.data.name // Added city name in response
    };
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};