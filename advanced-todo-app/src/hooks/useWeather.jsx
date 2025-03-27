import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherForLocation } from '../redux/slices/weatherSlice';

export const useWeather = (location) => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => 
    location ? state.weather.data[location] : null
  );
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    if (location) {
      dispatch(getWeatherForLocation(location));
    }
  }, [location, dispatch]);

  return {
    weather: weatherData,
    loading,
    error,
    refresh: () => location && dispatch(getWeatherForLocation(location))
  };
};