import { useWeather } from '../hooks/useWeather'

const WeatherInfo = ({ location }) => {
  const { weather, loading, error } = useWeather(location)

  if (!location) return null

  if (error) {
    return (
      <div className="text-red-500 text-xs mt-1">
        Weather: {error.includes('401') ? 'API Error - Check API Key' : error}
      </div>
    )
  }

  if (loading || !weather) {
    return <div className="text-xs mt-1">Loading weather...</div>
  }

  return (
    <div className="flex items-center text-xs mt-1">
      <span>
        {weather.city}: {weather.temp}°C, {weather.description}
      </span>
      {weather.icon && (
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
          alt={weather.description}
          className="ml-1 w-4 h-4"
        />
      )}
    </div>
  )
}

export default WeatherInfo