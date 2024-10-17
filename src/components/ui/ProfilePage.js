import React, { useState, useEffect } from 'react';
import { User, Heart, Image as ImageIcon, Edit } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import InstagramStyleFavorites from './InstagramStyleFavorites';
import UserMeasurements from './UserMeasurements';
import UpdateRoleUser from './UpdateRoleUser';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erreur lors du parsing de l'utilisateur depuis le localStorage", error);
      }
    }
  }, []);

  const coverPhoto = 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666';
  const isTailorOrSeller = user?.roles?.some(role => role.name === 'TAILOR' || role.name === 'SELLER');

  const posts = [
    // ... (posts data remains unchanged)
  ];

  const CustomTab = ({ icon, label, value }) => (
    <button
      className={`flex items-center px-4 py-2 rounded-full transition-colors ${
        activeTab === value
          ? 'bg-[#CC8C87] text-white'
          : 'bg-[#CC8C87]/20 text-gray-700 hover:bg-[#CC8C87]/30'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CC8C87] to-[#CC8C87] py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <ProfileHeader user={{ ...user, coverPhoto }} />
          
          <div className="p-6">
            <div className="flex justify-between mt-16 items-center mb-6">
              <div className="flex space-x-4">
                <CustomTab icon={<User className="w-4 h-4" />} label="Info" value="info" />
                <CustomTab icon={<Heart className="w-4 h-4" />} label="Favoris" value="favorites" />
                <CustomTab icon={<ImageIcon className="w-4 h-4" />} label="Posts" value="posts" />
              </div>
              <button className="bg-[#CC8C87] text-white px-4 py-2 rounded-full flex items-center">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {activeTab === 'info' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <UserInfo user={user} />
                </div>
                <div className="lg:col-span-2">
                  <div className="space-y-24">
                    {!isTailorOrSeller && <UpdateRoleUser user={user} setUser={setUser} />}
                    <UserMeasurements user={user} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && <InstagramStyleFavorites posts={posts} />}

            {activeTab === 'posts' && <UserPosts posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;