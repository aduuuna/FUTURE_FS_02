'use client'

import { useState, useEffect } from 'react'
import { useFavorites } from '../hooks/useFavorite'
import Link from 'next/link'
import { getWeatherIcon } from '../components/WeatherIcons'
import { Thermometer, Droplets, Wind, X, Sunrise, Sunset, CloudRain, Gauge } from 'lucide-react'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const [mounted, setMounted] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-pulse text-lg font-medium text-gray-600">Loading favorites...</div>
    </div>
  }
  
  const handleViewDetails = (city) => {
    setSelectedCity(city)
  }
  
  const closeDetails = () => {
    setSelectedCity(null)
  }
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">My Weather Favorites</h1>
      
      <Link href="/" className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Search
      </Link>
      
      {favorites.length === 0 ? (
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <p className="text-gray-600 mb-6">You haven't added any favorite locations yet.</p>
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Search for weather locations
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((city, index) => {
            const weatherDescription = city.weather?.[0]?.description;
            const iconCode = city.weather?.[0]?.icon;
            const temp = city.main?.temp;
            
            return (
              <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100">
                <div className="p-6">
                  {/* Header Section */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-xl font-bold text-gray-800">{city.name}</h2>
                        {city.sys?.country && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {city.sys.country}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeFavorite(city)}
                      className="p-2 rounded-full text-yellow-500 bg-yellow-50"
                      aria-label="Remove from favorites"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Main Weather Display - From WeatherCard component */}
                  <div className="flex flex-col items-center my-6 md:flex-row md:justify-center">
                    <div className="text-center md:mr-8">
                      <div className="text-5xl font-bold text-blue-700">{Math.round(temp)}°</div>
                      <p className="text-gray-500 capitalize mt-1">{weatherDescription}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center justify-center">
                      <div className="transform scale-125">
                        {iconCode && getWeatherIcon(iconCode)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Weather Details Cards */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-white p-2 rounded-xl shadow-sm flex flex-col items-center">
                      <Thermometer className="h-4 w-4 text-orange-500 mb-1" />
                      <p className="text-xs text-gray-500">Feels Like</p>
                      <p className="font-semibold text-gray-700">{Math.round(city.main?.feels_like)}°</p>
                    </div>
                    
                    <div className="bg-white p-2 rounded-xl shadow-sm flex flex-col items-center">
                      <Droplets className="h-4 w-4 text-blue-500 mb-1" />
                      <p className="text-xs text-gray-500">Humidity</p>
                      <p className="font-semibold text-gray-700">{city.main?.humidity}%</p>
                    </div>
                    
                    <div className="bg-white p-2 rounded-xl shadow-sm flex flex-col items-center">
                      <Wind className="h-4 w-4 text-blue-500 mb-1" />
                      <p className="text-xs text-gray-500">Wind</p>
                      <p className="font-semibold text-gray-700">{city.wind?.speed} m/s</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button 
                      onClick={() => handleViewDetails(city)}
                      className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {/* Detailed Weather Modal */}
      {selectedCity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold">
                {selectedCity.name}, {selectedCity.sys?.country}
              </h2>
              <button 
                onClick={closeDetails} 
                className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Close details"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Main Weather Display */}
              <div className="flex flex-col items-center my-6 md:flex-row md:justify-center">
                <div className="text-center md:mr-8">
                  <div className="text-6xl font-bold text-blue-700">{Math.round(selectedCity.main?.temp)}°</div>
                  <p className="text-gray-500 capitalize mt-1">{selectedCity.weather?.[0]?.description}</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center justify-center">
                  <div className="transform scale-150">
                    {selectedCity.weather?.[0]?.icon && getWeatherIcon(selectedCity.weather[0].icon)}
                  </div>
                </div>
              </div>
              
              {/* Primary Weather Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm flex flex-col items-center">
                  <Thermometer className="h-6 w-6 text-orange-500 mb-2" />
                  <p className="text-sm text-gray-500">Feels Like</p>
                  <p className="font-semibold text-gray-700 text-lg">{Math.round(selectedCity.main?.feels_like)}°</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm flex flex-col items-center">
                  <Droplets className="h-6 w-6 text-blue-500 mb-2" />
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-semibold text-gray-700 text-lg">{selectedCity.main?.humidity}%</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm flex flex-col items-center">
                  <Wind className="h-6 w-6 text-blue-500 mb-2" />
                  <p className="text-sm text-gray-500">Wind</p>
                  <p className="font-semibold text-gray-700 text-lg">{selectedCity.wind?.speed} m/s</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm flex flex-col items-center">
                  <Gauge className="h-6 w-6 text-blue-700 mb-2" />
                  <p className="text-sm text-gray-500">Pressure</p>
                  <p className="font-semibold text-gray-700 text-lg">{selectedCity.main?.pressure} hPa</p>
                </div>
              </div>
              
              {/* Additional Weather Information */}
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm mb-6">
                <h3 className="font-semibold text-gray-700 mb-4 text-lg">Additional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <CloudRain className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-gray-500 text-sm">Visibility</p>
                      <p className="font-medium">{(selectedCity.visibility / 1000).toFixed(1)} km</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-gray-500 text-sm">Cloud Cover</p>
                      <p className="font-medium">{selectedCity.clouds?.all}%</p>
                    </div>
                  </div>
                  
                  {selectedCity.sys?.sunrise && (
                    <div className="flex items-center">
                      <Sunrise className="h-5 w-5 text-orange-400 mr-3" />
                      <div>
                        <p className="text-gray-500 text-sm">Sunrise</p>
                        <p className="font-medium">
                          {new Date(selectedCity.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedCity.sys?.sunset && (
                    <div className="flex items-center">
                      <Sunset className="h-5 w-5 text-orange-600 mr-3" />
                      <div>
                        <p className="text-gray-500 text-sm">Sunset</p>
                        <p className="font-medium">
                          {new Date(selectedCity.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Temperature Range */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Min</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Max</span>
                    <Thermometer className="h-5 w-5 text-red-500 ml-2" />
                  </div>
                </div>
                
                <div className="relative h-8 bg-gradient-to-r from-blue-100 to-red-100 rounded-full overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span className="font-bold text-blue-700">{Math.round(selectedCity.main?.temp_min)}°</span>
                    <span className="font-bold text-red-700">{Math.round(selectedCity.main?.temp_max)}°</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-xs text-gray-500">
                  Weather data from OpenWeatherMap · Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}