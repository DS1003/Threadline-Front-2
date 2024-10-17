import React, { useState, useEffect } from 'react';
import apiService from '../../services/ApiService';

const MeasurementModal = ({ isOpen, onClose, onAdd, measurement, user }) => {
  const [newMeasurement, setNewMeasurement] = useState({
    chest: '',
    waist: '',
    hips: '',
    shoulder: '',
    sleeveLength: '', // Hommes
    neck: '',         // Hommes
    back: '',         // Hommes
    armhole: '',      // Hommes
    thigh: '',        // Commun
    calf: '',         // Hommes
    bust: '',         // Femmes
    inseam: '',       // Femmes
  });

  // Vérifiez si l'objet `user` est défini avant d'essayer d'y accéder
  const userGender = user ? user.gender : null;

  useEffect(() => {
    if (measurement) {
      setNewMeasurement(measurement);
    } else {
      // Réinitialiser les champs avec des valeurs spécifiques selon le genre
      setNewMeasurement((prev) => ({
        ...prev,
        thigh: '', // Valeur commune
        ...(userGender === 'MALE'
          ? { chest: '', waist: '', hips: '', shoulder: '', sleeveLength: '', neck: '', back: '', armhole: '', calf: '' }
          : { chest: '', waist: '', hips: '', shoulder: '', bust: '', inseam: '' })
      }));
    }
  }, [measurement, userGender]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeasurement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = measurement ? `/measurements/update/${measurement.id}` : '/measurements/add';
      const method = measurement ? 'PUT' : 'POST';
      const response = await apiService.request(method, endpoint, newMeasurement, user?.token);
      
      onAdd(response);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des mesures:', error);
    }
  };

  const renderInputField = (name, placeholder) => (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={newMeasurement[name]}
      onChange={handleChange}
      className="border p-2 mb-2 w-full"
    />
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-xs w-full z-100">
        <h2 className="text-lg font-bold mb-4">{measurement ? 'Modifier la mesure' : 'Ajouter des mesures'}</h2>
        <form onSubmit={handleSubmit}>
          {renderInputField('chest', 'Poitrine')}
          {renderInputField('waist', 'Taille')}
          {renderInputField('hips', 'Hanches')}
          {renderInputField('shoulder', 'Épaules')}
          
          {userGender === 'MALE' ? (
            <>
              {renderInputField('sleeveLength', 'Longueur de manche')}
              {renderInputField('neck', 'Cou')}
              {renderInputField('back', 'Dos')}
              {renderInputField('armhole', 'Emmanchure')}
              {renderInputField('calf', 'Mollet')}
            </>
          ) : (
            <>
              {renderInputField('bust', 'Buste')}
              {renderInputField('inseam', 'Entrejambe')}
            </>
          )}
          
          {renderInputField('thigh', 'Cuisse')}

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
