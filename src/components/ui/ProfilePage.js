import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import InstagramStyleFavorites from './InstagramStyleFavorites';
import UserMeasurements from './UserMeasurements';
import UpdateRoleUser from './UpdateRoleUser';

const ProfilePage = () => {
  const [userRole, setUserRole] = useState(''); // État pour stocker le rôle de l'utilisateur
  const connecteUser = JSON.parse(localStorage.getItem('user'));  
  const coverPhoto = 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666';
  const user = {...connecteUser, coverPhoto};
  console.log(user)
  /*const user = {
    name: 'Jane Doe',
    tagline: 'Photographer | Traveler | Coffee Lover',
    coverPhoto: 
    profilePicture: 'https://avatars.githubusercontent.com/u/100100154?v=4',
    location: 'New York, NY',
    work: 'Freelance Photographer',
    education: 'Bachelor of Fine Arts, NYU',
    relationshipStatus: 'Single',
  };*/

  const handleRoleUpdate = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole); // Mettre à jour le localStorage
  };
  

  // Récupérer le rôle de l'utilisateur depuis localStorage ou une autre source au chargement du composant
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole'); // Récupérer le rôle depuis localStorage
    console.log('Rôle récupéré depuis localStorage:', savedRole); // Ajouter un log pour vérifier la valeur
  
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

  const photos = [
    'https://source.unsplash.com/random/300x300?1',
    'https://source.unsplash.com/random/300x300?2',
    'https://source.unsplash.com/random/300x300?3',
    'https://source.unsplash.com/random/300x300?4',
    'https://source.unsplash.com/random/300x300?5',
    'https://source.unsplash.com/random/300x300?6',
  ];

  const measurements = {
    height: '5\'8"',
    weight: '130 lbs',
    chest: '34"',
    waist: '28"',
    hips: '36"',
    shoeSize: 'US 8',
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

            <UserMeasurements measurements={measurements} />
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
