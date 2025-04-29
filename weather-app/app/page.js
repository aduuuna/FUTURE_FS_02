'use client'

import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import WeatherDetails from './components/WeatherDetails'
import Forecast from './components/ForeCast'
import { useFavorites } from './hooks/useFavorite'

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to fetch weather data')
      }
      
      const data = await res.json()
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {weatherData && !loading && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <WeatherCard 
            data={weatherData.current}
            isFavorite={isFavorite(weatherData.current.name)}
            onToggleFavorite={() => {
              isFavorite(weatherData.current.name)
                ? removeFavorite(weatherData.current)
                : addFavorite(weatherData.current)
            }}
          />
          
          <WeatherDetails data={weatherData.current} />
          
          <div className="md:col-span-2">
            <Forecast data={weatherData.forecast} />
          </div>
        </div>
      )}
    </main>
  )
}
