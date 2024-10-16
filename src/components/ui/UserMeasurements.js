import React, { useState } from 'react';
import { Ruler } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import MeasurementModal from './MeasurementModal';

const UserMeasurements = ({ measurements, onAddMeasurement, onDeleteMeasurement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeasurement, setCurrentMeasurement] = useState(null);

  const openModal = (measurement = null) => {
    setCurrentMeasurement(measurement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentMeasurement(null);
    setIsModalOpen(false);
  };

  const handleAddMeasurement = (newMeasurement) => {
    onAddMeasurement(newMeasurement);
    closeModal();
  };

  const handleDeleteMeasurement = (index) => {
    onDeleteMeasurement(index); // Appeler la fonction de suppression à partir du parent
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#FFF5F4] rounded-xl border-2 shadow-lg p-8 mb-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#4A4A4A] border-b-2 border-[#CC8C87] pb-2 flex items-center justify-center">
        <Ruler className="w-8 h-8 mr-3 text-[#CC8C87]" />
        Mesures
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {measurements.map((measurement, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h3 className="text-lg font-semibold text-[#CC8C87]">Mesure {measurement.clientName}</h3>
            <p className="text-sm">Poitrine: {measurement.chest} cm</p>
            <p className="text-sm">Taille: {measurement.waist} cm</p>
            <p className="text-sm">Hanches: {measurement.hips} cm</p>
            <p className="text-sm">Épaules: {measurement.shoulder} cm</p>
            <p className="text-sm">Buste: {measurement.bust} cm</p>
            <p className="text-sm">Entrejambe: {measurement.inseam} cm</p>
            <p className="text-sm">Cuisse: {measurement.thigh} cm</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => openModal(measurement)}
                className="bg-[#CC8C87] text-white rounded-full py-2 px-4 hover:bg-[#a96d69] transition duration-300"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeleteMeasurement(index)}
                className="bg-red-500 text-white rounded-full py-2 px-4 hover:bg-red-700 transition duration-300"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={() => openModal()}
          className="bg-[#CC8C87] text-white rounded-full p-3 hover:bg-[#a96d69] transition duration-300"
          title='Ajouter une mesure'
        >
          <FaPlus className="w-6 h-6" />
        </button>
      </div>

      <MeasurementModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddMeasurement}
        measurement={currentMeasurement}
      />
    </div>
  );
};

export default UserMeasurements;
