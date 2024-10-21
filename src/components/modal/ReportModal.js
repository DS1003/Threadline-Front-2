import React, { useState } from "react";

const ReportModal = ({ show, onClose, onSubmitReport, reportReason, setReportReason }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Signaler un post</h2>
        
        <p className="text-gray-700 mb-4">Veuillez indiquer la raison de votre signalement.</p>
        
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Raison du signalement"
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
        ></textarea>

        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={onSubmitReport}
          >
            Signaler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
