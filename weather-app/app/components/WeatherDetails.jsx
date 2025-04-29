import { WeatherConditionIcons } from './WeatherIcons';

export default function WeatherDetails({ data }) {
  if (!data || !data.main) return null;
  

  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };
  

  const details = [
    {
      name: 'Pressure',
      value: `${data.main.pressure} hPa`,
      icon: WeatherConditionIcons.pressure,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      name: 'Humidity',
      value: `${data.main.humidity}%`,
      icon: WeatherConditionIcons.humidity,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Wind Speed',
      value: `${data.wind?.speed} m/s`,
      icon: WeatherConditionIcons.wind,
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700'
    },
    {
      name: 'Visibility',
      value: `${((data.visibility || 0) / 1000).toFixed(1)} km`,
      icon: WeatherConditionIcons.visibility,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700'
    },
    {
      name: 'Sunrise',
      value: formatTime(data.sys?.sunrise),
      icon: WeatherConditionIcons.sunrise,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    },
    {
      name: 'Sunset',
      value: formatTime(data.sys?.sunset),
      icon: WeatherConditionIcons.sunset,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
        <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        Weather Details
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {details.map((detail, index) => (
          <div 
            key={index} 
            className={`${detail.bgColor} rounded-xl p-4 transition-transform hover:scale-105 flex flex-col items-center border border-opacity-10 ${detail.textColor.replace('text', 'border')}`}
          >
            {detail.icon}
            <p className="text-gray-500 text-sm mt-2">{detail.name}</p>
            <p className={`text-lg font-medium mt-1 ${detail.textColor}`}>{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}