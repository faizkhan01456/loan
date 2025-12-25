import React from 'react';

function StatusCard({ label, value, colorClass = "border-gray-200 text-gray-900" }) {
  return (
    <div className={`bg-white rounded-xl p-3 border ${colorClass}`}>
      <p className={`text-xs ${colorClass.includes('text-') ? '' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default StatusCard;