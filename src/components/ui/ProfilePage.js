import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import InstagramStyleFavorites from './InstagramStyleFavorites';
import UserMeasurements from './UserMeasurements';
import UpdateRoleUser from './UpdateRoleUser';

const ProfilePage = () => {
  const [userRole, setUserRole] = useState(''); // État pour stocker le rôle de l'utilisateur
  const [measurements, setMeasurements] = useState([]); // État pour stocker les ensembles de mesures
  const connecteUser = JSON.parse(localStorage.getItem('user'));
  const coverPhoto = 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666';
  const user = { ...connecteUser, coverPhoto };

  const handleRoleUpdate = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole); // Mettre à jour le localStorage
  };

  // Récupérer le rôle de l'utilisateur depuis localStorage ou une autre source au chargement du composant
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole'); // Récupérer le rôle depuis localStorage
    if (savedRole) {
      setUserRole(savedRole); // Mettre à jour l'état avec le rôle récupéré
    }
  }, []);

  const posts = [
    {
      id: 1,
      author: {
        name: user.name,
        profilePicture: user.profilePicture,
      },
      date: 'June 1, 2023',
      content: 'Just finished a great photoshoot in Central Park!',
      image: 'https://source.unsplash.com/random/800x600',
      likes: 124,
      comments: 23,
    },
    {
      id: 2,
      author: {
        name: user.name,
        profilePicture: user.profilePicture,
      },
      date: 'May 28, 2023',
      content: 'Exploring the streets of NYC. So much inspiration everywhere!',
      likes: 89,
      comments: 15,
    },
  ];

  const addMeasurement = (newMeasurement) => {
    setMeasurements((prevMeasurements) => {
      const existingMeasurementIndex = prevMeasurements.findIndex(m => m.id === newMeasurement.id);
  
      if (existingMeasurementIndex > -1) {
        // If the measurement exists, update it
        const updatedMeasurements = [...prevMeasurements];
        updatedMeasurements[existingMeasurementIndex] = newMeasurement;
        return updatedMeasurements;
      } else {
        // Otherwise, add a new measurement
        return [...prevMeasurements, newMeasurement];
      }
    });
  };
  

  // Fonction pour supprimer un ensemble de mesures
  const handleDeleteMeasurement = (index) => {
    setMeasurements((prevMeasurements) => prevMeasurements.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfileHeader user={user} />
      <div className="container mt-14 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserInfo user={user} />

            {user.roles && !user.roles.some(role => role.name === 'TAILOR' || role.name === 'SELLER') && (
              <UpdateRoleUser onRoleUpdate={handleRoleUpdate} />
            )}

            {/* Passer les fonctions d'ajout et de suppression à UserMeasurements */}
            <UserMeasurements 
              measurements={measurements} 
              onAddMeasurement={addMeasurement} 
              onDeleteMeasurement={handleDeleteMeasurement} // Passer la fonction de suppression
            />
            
            <InstagramStyleFavorites posts={posts} />
          </div>
          <div className="md:col-span-2">
            <UserPosts posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
