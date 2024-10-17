import React, { useState, useEffect } from 'react';
import { Ruler } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import MeasurementModal from './MeasurementModal';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal
import apiService from '../../services/ApiService';

const UserMeasurements = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for confirmation modal
  const [currentMeasurement, setCurrentMeasurement] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [measurementToDelete, setMeasurementToDelete] = useState(null); // Store the measurement ID to delete

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const response = await apiService.request('GET', '/measurements/all', null, user?.token);
        setMeasurements(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des mesures:', error);
      }
    };
    if (user?.token) {
      fetchMeasurements();
    }
  }, [user]);

  const openModal = (measurement = null) => {
    setCurrentMeasurement(measurement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentMeasurement(null);
    setIsModalOpen(false);
  };

  const handleAddMeasurement = (newMeasurement) => {
    setMeasurements((prevMeasurements) => {
      if (currentMeasurement) {
        // Mise à jour d'une mesure existante
        return prevMeasurements.map((m) => (m.id === currentMeasurement.id ? newMeasurement : m));
      } else {
        // Ajout d'une nouvelle mesure
        return [...prevMeasurements, newMeasurement];
      }
    });
    closeModal();
  };

  // Open the confirmation modal
  const handleDeleteClick = (id) => {
    setMeasurementToDelete(id);
    setIsConfirmationOpen(true);
  };

  // Confirm delete measurement
  const confirmDeleteMeasurement = async () => {
    if (!measurementToDelete) return;
    try {
      const response = await apiService.request('DELETE', `/measurements/delete/${measurementToDelete}`, null, user?.token);
      if (response.status === 200) {
        setMeasurements((prev) => prev.filter((m) => m.id !== measurementToDelete));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression des mesures:', error);
    } finally {
      setIsConfirmationOpen(false);
      setMeasurementToDelete(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#FFF5F4] rounded-xl border-2 shadow-lg p-8 mb-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#4A4A4A] border-b-2 border-[#CC8C87] pb-2 flex items-center justify-center">
        <Ruler className="w-8 h-8 mr-3 text-[#CC8C87]" />
        Mesures
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {measurements.map((m) => (
          <div key={m.id} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h3 className="text-lg font-semibold text-[#CC8C87]">Mesure</h3>
            <p className="text-sm">Poitrine: {m.chest} cm</p>
            <p className="text-sm">Taille: {m.waist} cm</p>
            <p className="text-sm">Hanches: {m.hips} cm</p>
            <p className="text-sm">Épaules: {m.shoulder} cm</p>
            <p className="text-sm">Buste: {m.bust} cm</p>
            <p className="text-sm">Entrejambe: {m.inseam} cm</p>
            <p className="text-sm">Cuisse: {m.thigh} cm</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => openModal(m)}
                className="bg-[#CC8C87] text-white rounded-full py-2 px-4 hover:bg-[#a96d69] transition duration-300"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDeleteClick(m.id)} // Pass the measurement id to delete
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
        user={user}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)} // Close the confirmation modal
        onConfirm={confirmDeleteMeasurement} // Confirm deletion
        message="Êtes-vous sûr de vouloir supprimer cette mesure ?" // Confirmation message
      />
    </div>
  );
};

export default UserMeasurements;
