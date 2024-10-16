import React, { useState, useEffect } from 'react';
import apiService from '../../services/ApiService'; // Importez le service API

const MeasurementModal = ({ isOpen, onClose, onAdd, measurement }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [newMeasurement, setNewMeasurement] = useState({
    waist: '',
    chest: '',
    hips: '',
    shoulder: '',
    bust: '',
    inseam: '',
    thigh: '',
  });

  useEffect(() => {
    if (measurement) {
      setNewMeasurement(measurement);
    }
  }, [measurement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeasurement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = measurement ? `/measurements/update/${measurement.id}` : '/measurements/add';
      const method = measurement ? 'PUT' : 'POST';
      const response = await apiService.request(method, endpoint, newMeasurement, user.token);
      
      onAdd(response);
      setNewMeasurement({
        waist: '',
        chest: '',
        hips: '',
        shoulder: '',
        bust: '',
        inseam: '',
        thigh: '',
      });
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des mesures:', error);
    }
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-xs w-full z-100">
        <h2 className="text-lg font-bold mb-4">{measurement ? 'Modifier la mesure' : 'Ajouter des mesures'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="chest"
            placeholder="Poitrine"
            value={newMeasurement.chest}
            onChange={handleChange}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="waist"
            placeholder="Taille"
            value={newMeasurement.waist}
            onChange={handleChange}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="hips"
            placeholder="Hanches"
            value={newMeasurement.hips}
            onChange={handleChange}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="shoulder"
            placeholder="Épaule"
            value={newMeasurement.shoulder}
            onChange={handleChange}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="bust"
            placeholder="Poitrine"
            value={newMeasurement.bust}
            onChange={handleChange}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="inseam"
            placeholder="Entrejambe"
            value={newMeasurement.inseam}
            onChange={handleChange}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="thigh"
            placeholder="Cuisse"
            value={newMeasurement.thigh}
            onChange={handleChange}
            required
            className="border p-2 mb-4 w-full"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#a96d69] text-white py-2 px-4 rounded hover:bg-[#cc8c87] hover:text-gray-700 transition duration-300"
            >
              {measurement ? 'Modifier' : 'Ajouter'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeasurementModal;
