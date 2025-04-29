'use client'

import { useState } from 'react'
import { Search, MapPin, X } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }
  
  const clearSearch = () => {
    setCity('')
  }
  
  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex w-full">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <MapPin className="h-5 w-5" />
        </div>
        
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city or location..."
          className="flex-grow pl-10 pr-14 py-3 border-2 border-blue-100 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm text-gray-700"
          required
        />
        
        {city && (
          <button 
            type="button" 
            onClick={clearSearch}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <button 
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-r-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center shadow-md"
        >
          <Search className="h-5 w-5" />
          <span className="ml-1">Search</span>
        </button>
      </form>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <button 
          onClick={() => onSearch('London')}
          className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors"
        >
          London
        </button>
        <button 
          onClick={() => onSearch('New York')}
          className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors"
        >
          New York
        </button>
        <button 
          onClick={() => onSearch('Tokyo')}
          className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors"
        >
          Tokyo
        </button>
      </div>
    </div>
  )
}