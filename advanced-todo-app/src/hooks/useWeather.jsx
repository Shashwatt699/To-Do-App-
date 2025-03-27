import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from '../redux/slices/weatherSlice'

export const useWeather = (location) => {
  const dispatch = useDispatch()
  const weatherState = useSelector(state => state.weather)
  
  const weather = location ? weatherState.data[location] : null
  const loading = weatherState.loading
  const error = weatherState.error

  useEffect(() => {
    if (location) {
      dispatch(fetchWeather(location))
    }
  }, [location, dispatch])

  return {
    weather,
    loading,
    error,
    refresh: () => dispatch(fetchWeather(location))
  }
}