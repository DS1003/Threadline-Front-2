import React from 'react';
import { Ruler } from 'lucide-react';

const MeasurementsList = ({ measurement }) => {
  const measurementsToRender = [
    { label: 'Poitrine', key: 'chest' },
    { label: 'Taille', key: 'waist' },
    { label: 'Hanches', key: 'hips' },
    { label: 'Épaules', key: 'shoulder' },
    { label: 'Cuisse', key: 'thigh' },
    { label: 'Longueur de manche', key: 'sleeveLength' },
    { label: 'Cou', key: 'neck' },
    { label: 'Dos', key: 'back' },
    { label: 'Emmanchure', key: 'armhole' },
    { label: 'Mollet', key: 'calf' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {measurementsToRender.map(({ label, key }) => (
        measurement[key] && (
          <div key={key} className="flex items-center">
            <Ruler className="w-4 h-4 text-[#E5A6A6] mr-2" />
            <span className="text-sm">{label}: <strong>{measurement[key]} cm</strong></span>
          </div>
        )
      ))}
    </div>
  );
};

export default MeasurementsList;