import React from 'react';
import UserMeasurements from './UserMeasurements';

const UserProfile = () => {
  const userMeasurements = {
    chest: '100',
    waist: '80',
    hips: '90',
    shoulder: '42',
    bust: '34',
    inseam: '31',
    thigh: '60'
  };

  return (
    <div>
      <h1>Profil de l'utilisateur</h1>
      <UserMeasurements measurements={userMeasurements} />
    </div>
  );
};

export default UserProfile;
