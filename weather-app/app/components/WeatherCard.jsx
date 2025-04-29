import { Star, MoreHorizontal, Thermometer, Droplets, Wind } from 'lucide-react';
import { getWeatherIcon } from './WeatherIcons';

export default function WeatherCard({ data, isFavorite, onToggleFavorite }) {
  if (!data) return null;
  
  
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  const temp = data.main?.temp;
  const weatherDescription = data.weather?.[0]?.description;
  const iconCode = data.weather?.[0]?.icon;
  
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
              {data.sys?.country && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {data.sys.country}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm">{formattedDate}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Main Weather Display */}
        <div className="flex flex-col items-center my-8 md:flex-row md:justify-center">
          <div className="text-center md:mr-8">
            <div className="text-7xl font-bold text-blue-700">{Math.round(temp)}°</div>
            <p className="text-gray-500 capitalize mt-1">{weatherDescription}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center justify-center">
            <div className="transform scale-150">
              {iconCode && getWeatherIcon(iconCode)}
            </div>
          </div>
        </div>
        
        {/* Weather Details Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center">
            <Thermometer className="h-5 w-5 text-orange-500 mb-1" />
            <p className="text-xs text-gray-500">Feels Like</p>
            <p className="font-semibold text-gray-700">{Math.round(data.main?.feels_like)}°C</p>
          </div>
          
          <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center">
            <Droplets className="h-5 w-5 text-blue-500 mb-1" />
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="font-semibold text-gray-700">{data.main?.humidity}%</p>
          </div>
          
          <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center">
            <Wind className="h-5 w-5 text-blue-500 mb-1" />
            <p className="text-xs text-gray-500">Wind</p>
            <p className="font-semibold text-gray-700">{data.wind?.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}