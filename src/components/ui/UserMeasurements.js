import React, { useState, useEffect } from 'react';
import { Ruler, Plus, Edit2, Trash2 } from 'lucide-react';
import MeasurementModal from './MeasurementModal';
import ConfirmationModal from './ConfirmationModal';
import apiService from '../../services/ApiService';

const UserMeasurements = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentMeasurement, setCurrentMeasurement] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);

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
      } else {
        return [...prevMeasurements, newMeasurement];
      }
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
    ];

    const maleMeasurements = [
      { label: 'Longueur de manche', key: 'sleeveLength' },
      { label: 'Cou', key: 'neck' },
      { label: 'Dos', key: 'back' },
      { label: 'Emmanchure', key: 'armhole' },
      { label: 'Cuisse', key: 'thigh' },
      { label: 'Mollet', key: 'calf' },
    ];

    const femaleMeasurements = [
      { label: 'Buste', key: 'bust' },
      { label: 'Entrejambe', key: 'inseam' },
      { label: 'Cuisse', key: 'thigh' },
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
            <FaPlus className="mr-2" />
    <div className="relative bg-gradient-to-br from-[#f0f4ff] to-[#e9f1ff] rounded-3xl shadow-2xl p-8 mb-6 max-w-4xl mx-auto overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#CC8C87] to-[#CC8C87] opacity-10 animate-pulse"></div>
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white bg-opacity-40 rounded-3xl"></div>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-[#3a3a3a] flex items-center justify-center">
          <Ruler className="w-10 h-10 mr-4 text-[#CC8C87]" />
          Mesures
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {measurements.map((m) => (
            <div key={m.id} className="bg-white bg-opacity-60 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-102 backdrop-blur-md">
              <h3 className="text-xl font-semibold text-[#CC8C87] mb-4">Mesure #{m.id}</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Poitrine', value: m.chest },
                  { label: 'Taille', value: m.waist },
                  { label: 'Hanches', value: m.hips },
                  { label: 'Épaules', value: m.shoulder },
                  { label: 'Buste', value: m.bust },
                  { label: 'Entrejambe', value: m.inseam },
                  { label: 'Cuisse', value: m.thigh },
                ].map(({ label, value }) => (
                  <p key={label} className="text-sm">
                    <span className="font-medium text-gray-600">{label}:</span> {value} cm
                  </p>
                ))}
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => openModal(m)}
                  className="bg-[#CC8C87] text-white rounded-full p-2 hover:bg-[#B87872] transition duration-300"
                  title="Modifier"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteClick(m.id)}
                  className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-[#CC8C87] to-[#B87872] text-white rounded-full p-4 hover:from-[#B87872] hover:to-[#A76A64] transition duration-300 transform hover:scale-105 shadow-lg"
            title="Ajouter une mesure"
          >
            <Plus className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Modal de confirmation pour suppression */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onConfirm={confirmDeleteMeasurement}
        onCancel={() => setIsConfirmationOpen(false)}
      />

      {/* Modal pour ajout/édition de mesure */}
      <MeasurementModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddMeasurement}
        measurement={currentMeasurement}
        user={user}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmDeleteMeasurement}
        message="Êtes-vous sûr de vouloir supprimer cette mesure ?"
      />
    </div>
  );
};

export default UserMeasurements;