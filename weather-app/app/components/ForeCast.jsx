import { Calendar } from 'lucide-react';
import { getWeatherIcon } from './WeatherIcons';

export default function Forecast({ data }) {
  if (!data || !data.list) return null;
  

  const groupedByDay = data.list.reduce((days, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!days[date]) {
      days[date] = [];
    }
    
    days[date].push(item);
    return days;
  }, {});

  const dailyForecasts = Object.values(groupedByDay).map(dayData => {
   
    const noonForecast = dayData.find(item => {
      const hour = new Date(item.dt * 1000).getHours();
      return hour >= 11 && hour <= 13;
    });
    
    return noonForecast || dayData[0];
  }).slice(0, 5); 
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-blue-500" />
        5-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
          const iconCode = forecast.weather?.[0]?.icon;
          
          return (
            <div 
              key={index} 
              className={`bg-gradient-to-b ${index % 2 === 0 ? 'from-blue-50 to-indigo-50' : 'from-sky-50 to-blue-50'} rounded-xl p-4 text-center shadow-sm border border-blue-100 transition-transform hover:scale-105`}
            >
              <p className="font-medium text-blue-800">{day}</p>
              <p className="text-xs text-gray-500 mb-3">{formattedDate}</p>
              
              <div className="flex justify-center my-2">
                {iconCode && getWeatherIcon(iconCode)}
              </div>
              
              <p className="font-bold text-lg text-gray-800 mt-2">
                {Math.round(forecast.main?.temp)}°C
              </p>
              
              <p className="text-xs capitalize text-gray-600 mt-1">
                {forecast.weather?.[0]?.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}