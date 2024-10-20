import React, { useState, useEffect } from 'react';
import { User, Heart, Image as ImageIcon, Edit, Users, Settings } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPostsComponents from './UserPostsComponents';
import InstagramStyleFavorites from './InstagramStyleFavorites';
import UserMeasurements from './UserMeasurements';
import UpdateRoleUser from './UpdateRoleUser';
import FriendsList from './FriendList';

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

  const tabs = [
    { icon: <User className="w-5 h-5" />, label: "Infos", value: "info" },
    { icon: <Heart className="w-5 h-5" />, label: "Favoris", value: "favorites" },
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
                    <div className="space-y-8">
                      {!isTailorOrSeller && <UpdateRoleUser user={user} setUser={setUser} />}
                      <UserMeasurements user={user} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <InstagramStyleFavorites posts={[]} />
              )}

              {activeTab === 'posts' && user && (
                <UserPostsComponents user={user} />
              )}

              {activeTab === 'friends' && user && (
                <FriendsList userId={user.id} showUnfollowButton={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;