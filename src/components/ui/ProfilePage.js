import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import InstagramStyleFavorites from './InstagramStyleFavorites';
import UserMeasurements from './UserMeasurements';
import UpdateRoleUser from './UpdateRoleUser';

const ProfilePage = () => {
  const [measurements, setMeasurements] = useState([]);
  const [user, setUser] = useState(null); // État pour stocker l'utilisateur connecté

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis localStorage
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setUser(parsedUser); // Mettre à jour l'état avec les informations utilisateur
        //setUserRole(parsedUser.roles.map(role => role.name)); // Récupérer le rôle
      } catch (error) {
        console.error("Erreur lors du parsing de l'utilisateur depuis le localStorage", error);
      }
    }
  }, []);
 

  const coverPhoto = 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666';
 
  // Vérification des rôles pour décider d'afficher ou non le composant UpdateRoleUser
  const isTailorOrSeller = user?.roles?.some(role => role.name === 'TAILOR' || role.name === 'SELLER');

  const posts = [
    {
      id: 1,
      author: {
        name: 'kaba',
        profilePicture: 'https://source.unsplash.com/random/800x600',
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
        name: 'diallo',
        profilePicture: 'https://source.unsplash.com/random/800x600',
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
  }


  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfileHeader user={{ ...user, coverPhoto }} />
      <div className="container mt-14 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserInfo user={user} />
            
            {!isTailorOrSeller && (
              <UpdateRoleUser user={user} setUser={setUser} />
            )}

            {/* Passer les fonctions d'ajout et de suppression à UserMeasurements */}
            <UserMeasurements 
              user={user}
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
