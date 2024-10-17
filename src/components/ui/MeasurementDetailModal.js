import React from 'react';
import { X } from 'lucide-react';

const MeasurementDetailModal = ({ isOpen, onClose, measurement }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-br from-[#f0f4ff] to-[#e9f1ff] rounded-3xl shadow-2xl p-8 max-w-md mx-auto overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#CC8C87] to-[#CC8C87] opacity-10 animate-pulse"></div>
        
        {/* Glass effect overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white bg-opacity-40 rounded-3xl"></div>
        
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
          >
            <X className="w-6 h-6" />
          </button>
          
          <h2 className="text-3xl font-bold mb-6 text-center text-[#3a3a3a]">Détails de la Mesure</h2>
          
          {measurement && (
            <div className="bg-white bg-opacity-60 rounded-2xl shadow-lg p-6 backdrop-blur-md">
              <ul className="space-y-4">
                {[
                  { label: 'Taille', value: measurement.height, unit: 'cm' },
                  { label: 'Poids', value: measurement.weight, unit: 'kg' },
                  { label: 'Poitrine', value: measurement.chest, unit: 'cm' },
                  { label: 'Taille', value: measurement.waist, unit: 'cm' },
                  { label: 'Hanches', value: measurement.hips, unit: 'cm' },
                  { label: 'Pointure', value: measurement.shoeSize, unit: '' },
                ].map(({ label, value, unit }) => (
                  <li key={label} className="flex justify-between items-center text-gray-700">
                    <span className="font-semibold text-[#CC8C87]">{label} :</span>
                    <span className="bg-[#CC8C87] bg-opacity-10 px-3 py-1 rounded-full">
                      {value} {unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-[#CC8C87] to-[#B87872] text-white py-2 px-6 rounded-full hover:from-[#B87872] hover:to-[#A76A64] transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementDetailModal;