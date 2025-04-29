import { 
    Sun, 
    Cloud, 
    CloudRain, 
    CloudSnow, 
    CloudLightning, 
    CloudDrizzle, 
    CloudFog, 
    Wind 
  } from 'lucide-react';
  
  export function getWeatherIcon(iconCode) {
  
    
    const iconMap = {
      // Clear
      '01d': <Sun size={36} className="text-yellow-500" />,
      '01n': <Sun size={36} className="text-yellow-400" />,
      
      // Few clouds
      '02d': (
        <div className="relative">
          <Sun size={36} className="text-yellow-500" />
          <Cloud size={24} className="text-gray-300 absolute bottom-0 right-0" />
        </div>
      ),
      '02n': (
        <div className="relative">
          <Sun size={36} className="text-yellow-400" />
          <Cloud size={24} className="text-gray-400 absolute bottom-0 right-0" />
        </div>
      ),
      
      // Scattered clouds
      '03d': <Cloud size={36} className="text-gray-400" />,
      '03n': <Cloud size={36} className="text-gray-500" />,
      
      // Broken clouds
      '04d': (
        <div className="relative">
          <Cloud size={36} className="text-gray-400" />
          <Cloud size={24} className="text-gray-300 absolute bottom-0 right-0" />
        </div>
      ),
      '04n': (
        <div className="relative">
          <Cloud size={36} className="text-gray-500" />
          <Cloud size={24} className="text-gray-400 absolute bottom-0 right-0" />
        </div>
      ),
      
      // Shower rain
      '09d': <CloudDrizzle size={36} className="text-blue-400" />,
      '09n': <CloudDrizzle size={36} className="text-blue-500" />,
      
      // Rain
      '10d': <CloudRain size={36} className="text-blue-500" />,
      '10n': <CloudRain size={36} className="text-blue-600" />,
      
      // Thunderstorm
      '11d': <CloudLightning size={36} className="text-purple-500" />,
      '11n': <CloudLightning size={36} className="text-purple-600" />,
      
      // Snow
      '13d': <CloudSnow size={36} className="text-blue-200" />,
      '13n': <CloudSnow size={36} className="text-blue-300" />,
      
      // Mist/Fog
      '50d': <CloudFog size={36} className="text-gray-400" />,
      '50n': <CloudFog size={36} className="text-gray-500" />,
    };
    
    // Return the mapped icon or a default icon
    return iconMap[iconCode] || <Cloud size={36} className="text-gray-400" />;
  }
  
  // Weather condition icons for details
  export const WeatherConditionIcons = {
    pressure: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    humidity: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    wind: <Wind className="h-6 w-6 text-blue-600" />,
    visibility: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    sunrise: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v8" />
        <path d="M4.93 10.93l1.41 1.41" />
        <path d="M2 18h2" />
        <path d="M20 18h2" />
        <path d="M19.07 10.93l-1.41 1.41" />
        <path d="M22 22H2" />
        <path d="M8 6l4-4 4 4" />
        <path d="M16 18a4 4 0 0 0-8 0" />
      </svg>
    ),
    sunset: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 10v8" />
        <path d="M4.93 15.93l1.41 1.41" />
        <path d="M2 23h2" />
        <path d="M20 23h2" />
        <path d="M19.07 15.93l-1.41 1.41" />
        <path d="M22 27H2" />
        <path d="M8 14l4 4 4-4" />
        <path d="M16 23a4 4 0 0 0-8 0" />
      </svg>
    ),
  };