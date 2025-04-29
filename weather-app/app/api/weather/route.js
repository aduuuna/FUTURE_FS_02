import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const apiKey = process.env.WEATHER_API_KEY 
  
  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 })
  }
  
  try {

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=yes&alerts=yes`
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to fetch weather data')
    }
    
    const data = await response.json()
    
    // Format the response to maintain compatibility with your components
    return NextResponse.json({
      current: {
        name: data.location.name,
        main: {
          temp: data.current.temp_c,
          feels_like: data.current.feelslike_c,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb
        },
        weather: [
          {
            description: data.current.condition.text,
            icon: data.current.condition.icon.split('/').pop()
          }
        ],
        wind: {
          speed: (data.current.wind_kph / 3.6 ).toFixed(2)
        },
        visibility: data.current.vis_km * 1000, 
        sys: {
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          sunset: data.forecast.forecastday[0].astro.sunset,
          country: data.location.country
        }
      },
      forecast: {
        list: data.forecast.forecastday.map(day => ({
          dt: new Date(day.date).getTime() / 1000,
          main: {
            temp: day.day.avgtemp_c
          },
          weather: [
            {
              description: day.day.condition.text,
              icon: day.day.condition.icon.split('/').pop()
            }
          ]
        }))
      }
    })
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}