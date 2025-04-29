import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState([])
  
  useEffect(() => {
    // Load favorites from localStorage when component mounts
    const storedFavorites = localStorage.getItem('weatherFavorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])
  
  // Add city to favorites
  const addFavorite = (city) => {
    const newFavorites = [...favorites, city]
    setFavorites(newFavorites)
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites))
  }
  
  // Remove city from favorites
  const removeFavorite = (city) => {
    const newFavorites = favorites.filter(fav => fav.name !== city.name)
    setFavorites(newFavorites)
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites))
  }
  
  // Check if city is in favorites
  const isFavorite = (cityName) => {
    return favorites.some(city => city.name === cityName)
  }
  
  return { favorites, addFavorite, removeFavorite, isFavorite }
}