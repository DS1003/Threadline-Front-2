import React, { useState, useEffect } from 'react';
import { Ruler, Plus } from 'lucide-react';
import MeasurementModal from './MeasurementModal';
import ConfirmationModal from './ConfirmationModal';
import apiService from '../../services/ApiService';

const UserMeasurements = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentMeasurement, setCurrentMeasurement] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // State for controlling visibility of measurements

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
        return prevMeasurements.map((m) => (m.id === currentMeasurement.id ? newMeasurement : m));
      }
      return [...prevMeasurements, newMeasurement];
    });
    closeModal();
  };

  const handleDeleteClick = (id) => {
    setMeasurementToDelete(id);
    setIsConfirmationOpen(true);
  };

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

  const renderMeasurements = (m) => {
    const commonMeasurements = [
      { label: 'Poitrine', key: 'chest' },
      { label: 'Taille', key: 'waist' },
      { label: 'Hanches', key: 'hips' },
      { label: 'Épaules', key: 'shoulder' },
      { label: 'Cuisse', key: 'thigh' },
    ];

    const maleMeasurements = [
      { label: 'Longueur de manche', key: 'sleeveLength' },
      { label: 'Cou', key: 'neck' },
      { label: 'Dos', key: 'back' },
      { label: 'Emmanchure', key: 'armhole' },
      { label: 'Mollet', key: 'calf' },
    ];

    const femaleMeasurements = [
      { label: 'Buste', key: 'bust' },
      { label: 'Entrejambe', key: 'inseam' },
    ];

    const measurementsToRender = [
      ...commonMeasurements,
      ...(user.gender === 'MALE' ? maleMeasurements : femaleMeasurements),
    ];

    return measurementsToRender.map(({ label, key }) => (
      m[key] && <p key={key} className="text-sm">{label}: {m[key]} cm</p>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#FFF5F4] rounded-xl border-2 shadow-lg p-8 mb-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#4A4A4A] border-b-2 border-[#CC8C87] pb-2 flex items-center justify-center">
        <Ruler className="w-8 h-8 mr-3 text-[#CC8C87]" />
        Mesures
      </h2>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)} // Toggle expanded state
          className="bg-[#CC8C87] text-white rounded-full py-2 px-4 hover:bg-[#a96d69]"
        >
          {isExpanded ? 'Masquer les mesures' : 'Afficher les mesures'} {/* Toggle button text */}
        </button>
      </div>

      {isExpanded && ( // Conditionally render measurements
        <div className="grid grid-cols-1 gap-6">
          {measurements.map((m) => (
            <div key={m.id} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <h3 className="text-lg font-semibold text-[#CC8C87]">Mesure</h3>
              {renderMeasurements(m)}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openModal(m)}
                  className="bg-[#CC8C87] text-white rounded-full py-2 px-4 hover:bg-[#a96d69]"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteClick(m.id)}
                  className="bg-red-500 text-white rounded-full py-2 px-4 hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              onClick={() => openModal()}
              className="flex items-center justify-center bg-[#CC8C87] text-white rounded-full py-3 px-5 hover:bg-[#a96d69] mt-6"
              title='Ajouter une mesure'
            >
              <Plus className="mr-2" />
              Ajouter une mesure
            </button>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onConfirm={confirmDeleteMeasurement}
        onCancel={() => setIsConfirmationOpen(false)}
      />

      <MeasurementModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddMeasurement}
        measurement={currentMeasurement}
        user={user}
      />
    </div>
  );
};

export default UserMeasurements;
