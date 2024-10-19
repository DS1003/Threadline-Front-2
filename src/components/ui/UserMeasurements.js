import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './Card';
import { Button } from './Button';
import MeasurementModal from './MeasurementModal';
import ConfirmationModal from './ConfirmationModal';
import MeasurementsList from './ MeasurementsList';
import apiService from '../../services/ApiService';
const UserMeasurements = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentMeasurement, setCurrentMeasurement] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const measurementsPerPage = 1;

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
        if (currentPage > 0 && measurements.length % measurementsPerPage === 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la suppression des mesures:', error);
    } finally {
      setIsConfirmationOpen(false);
      setMeasurementToDelete(null);
    }
  };

  const paginatedMeasurements = measurements.slice(
    currentPage * measurementsPerPage,
    (currentPage + 1) * measurementsPerPage
  );

  return (
    <Card className="bg-[#FFF5F4] rounded-2xl shadow-md overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-[#E5A6A6]">Mesures</h2>
          {measurements.length > 0 && (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="sm"
              className="text-[#E5A6A6]"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && measurements.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {paginatedMeasurements.map((m) => (
                <div key={m.id} className="bg-white rounded-lg p-3 mb-2">
                  <MeasurementsList measurement={m} />
                  <div className="flex justify-end mt-2 space-x-2">
                    <Button
                      onClick={() => openModal(m)}
                      size="sm"
                      className="bg-[#E5A6A6] hover:bg-[#D68F8F] text-white"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(m.id)}
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-2">
                <Button
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  size="sm"
                  className="bg-[#E5A6A6] hover:bg-[#D68F8F] text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-[#E5A6A6] font-medium">
                  {currentPage + 1} / {Math.ceil(measurements.length / measurementsPerPage)}
                </span>
                <Button
                  onClick={() => setCurrentPage((prev) => Math.min(Math.ceil(measurements.length / measurementsPerPage) - 1, prev + 1))}
                  disabled={currentPage === Math.ceil(measurements.length / measurementsPerPage) - 1}
                  size="sm"
                  className="bg-[#E5A6A6] hover:bg-[#D68F8F] text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-2">
          <Button
            onClick={() => openModal()}
            className="bg-[#E5A6A6] hover:bg-[#D68F8F] text-white rounded-full py-1 px-3"
          >
            <Plus className="w-4 h-4 mr-1" />
            {measurements.length === 0 ? "Ajouter une mesure" : "Nouvelle mesure"}
          </Button>
        </div>
      </CardContent>

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
    </Card>
  );
};

export default UserMeasurements;