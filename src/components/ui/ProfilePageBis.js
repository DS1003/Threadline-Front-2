import React, { useState, useEffect } from 'react';
import { User, Image as ImageIcon, Users } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import MeasurementsList from './ MeasurementsList'; // Remplacer par votre nouveau composant
import FriendsList from './FriendList';
import apiService from '../../services/ApiService'; // Assurez-vous que ce service est correctement configuré

const ProfilePageBis = ({ userId }) => {
  // Utilisez localStorage pour l'utilisateur s'il existe déjà
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données utilisateur de l'API
    const fetchUser = async () => {
      try {
        const response = await apiService.request('GET', `/users/${userId}`);
        const fetchedUser = response.data;
        setUser(fetchedUser); // Mettre à jour l'état avec les données récupérées
        localStorage.setItem('user', JSON.stringify(fetchedUser));
        console.log(user); // Inspect if measurements are included

        // Stocker dans localStorage
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    // Appeler la fonction pour récupérer l'utilisateur si non présent
    if (!user) {
      fetchUser();
    }
  }, [userId, user]);

  const coverPhoto = 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666';

  const posts = [
    // Remplir avec les données des publications de l'utilisateur
  ];

  const tabs = [
    { icon: <User className="w-5 h-5" />, label: "Infos", value: "info" },
    { icon: <ImageIcon className="w-5 h-5" />, label: "Posts", value: "posts" },
    { icon: <Users className="w-5 h-5" />, label: "Amis", value: "friends" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CC8C87] to-[#E6A8A1] py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <ProfileHeader user={{ ...user, coverPhoto }} />

          <div className="p-6">
            <div className="mt-20 mb-8 max-w-4xl mx-auto">
              <div className="w-full bg-gray-100 rounded-full p-1">
                <div className="flex justify-between">
                  {tabs.map((tab) => (
                    <button
                      key={tab.value}
                      className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 flex-grow ${
                        activeTab === tab.value
                          ? 'bg-gradient-to-r from-[#CC8C87] to-[#E6A8A1] text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setActiveTab(tab.value)}
                    >
                      {tab.icon}
                      <span className="ml-2 font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              {activeTab === 'info' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <UserInfo user={user} />
                  </div>
                  <div className="lg:col-span-2">
                  <MeasurementsList measurement={user?.measurements || {}} />

                  {/* Utiliser le nouveau composant */}
                  </div>
                </div>
              )}

              {activeTab === 'posts' && (
                <UserPosts posts={posts} />
              )}

              {activeTab === 'friends' && (
                <FriendsList />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageBis;
