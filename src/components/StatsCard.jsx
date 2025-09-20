
// components/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'gray' }) => {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-[#b892ff]/10 text-[#b892ff]',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="text-xs mt-1">{subtitle}</div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};


export default StatsCard