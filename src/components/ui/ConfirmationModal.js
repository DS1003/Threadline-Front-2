// ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4">Etes vous sûr de vouloir supprimer vos mesures ???</h2>
        <p>{message}</p>
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black rounded-full py-2 px-4 hover:bg-gray-400 transition duration-300"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white rounded-full py-2 px-4 hover:bg-red-700 transition duration-300"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
