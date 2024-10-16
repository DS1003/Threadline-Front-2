// MeasurementDetailModal.js
import React from 'react';

const MeasurementDetailModal = ({ isOpen, onClose, measurement }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Détails de la Mesure</h2>
        {measurement && (
          <ul className="space-y-2">
            <li className="flex justify-between text-gray-700">
              <span className="font-semibold">Taille :</span>
              <span>{measurement.height} cm</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span className="font-semibold">Poids :</span>
              <span>{measurement.weight} kg</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span className="font-semibold">Poitrine :</span>
              <span>{measurement.chest} cm</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span className="font-semibold">Taille :</span>
              <span>{measurement.waist} cm</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span className="font-semibold">Hanches :</span>
              <span>{measurement.hips} cm</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span className="font-semibold">Pointure :</span>
              <span>{measurement.shoeSize}</span>
            </li>
          </ul>
        )}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementDetailModal;
