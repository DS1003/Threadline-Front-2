import React from 'react';
import { Ruler } from 'lucide-react';

const UserMeasurements = ({ measurements }) => {
  const measurementItems = [
    { label: 'Height', value: measurements.height },
    { label: 'Weight', value: measurements.weight },
    { label: 'Chest', value: measurements.chest },
    { label: 'Waist', value: measurements.waist },
    { label: 'Hips', value: measurements.hips },
    { label: 'Shoe Size', value: measurements.shoeSize },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-[#FFF5F4] rounded-xl border-2  shadow-lg p-8 mb-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#4A4A4A] border-b-2 border-[#CC8C87] pb-2 flex items-center justify-center">
        <Ruler className="w-8 h-8 mr-3 text-[#CC8C87]" />
        Measurements
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {measurementItems.map(({ label, value }) => (
          <div key={label} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <p className="text-sm font-semibold text-[#CC8C87] mb-1">{label}</p>
            <p className="text-lg text-[#4A4A4A]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMeasurements;