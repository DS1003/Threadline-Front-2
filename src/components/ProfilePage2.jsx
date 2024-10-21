import React, { useState, useEffect } from 'react';
import { MapPin, User, Heart, Image as ImageIcon, Users, Twitter, Facebook, Instagram, Youtube, Twitch, Share2, Edit, Settings, Camera } from 'lucide-react';

// Composants fictifs - vous devrez les implémenter ou les remplacer par vos propres composants
import UserInfo from './ui/UserInfo';
import UserPosts from './ui/UserPosts';
import InstagramStyleFavorites from './ui/InstagramStyleFavorites';
import UserMeasurements from './ui/UserMeasurements';
import UpdateRoleUser from './ui/UpdateRoleUser';
import FriendsList from './ui/FriendList';

const ProfilePage2 = () => {
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

  const coverPhoto = 'https://res.cloudinary.com/drxouwbms/image/upload/v1728761058/cgkho4rmytr3vizj7efa.png';

  const isTailorOrSeller = user?.roles?.some(role => role.name === 'TAILOR' || role.name === 'SELLER');

  const tabs = [
    { icon: <User className="w-5 h-5" />, label: "Infos", value: "info" },
    { icon: <Heart className="w-5 h-5" />, label: "Favoris", value: "favorites" },
    { icon: <ImageIcon className="w-5 h-5" />, label: "Posts", value: "posts" },
    { icon: <Users className="w-5 h-5" />, label: "Amis", value: "friends" },
  ];

  const socialIcons = [
    { Icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-100' },
    { Icon: Twitter, color: 'text-blue-400', bg: 'bg-blue-50' },
    { Icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-100' },
    { Icon: Youtube, color: 'text-red-600', bg: 'bg-red-100' },
    { Icon: Twitch, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CC8C87] to-[#E6A8A1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
          {/* Profile Header */}
          <div className="relative h-80 sm:h-96">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${coverPhoto})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-end justify-between">
              <div className="flex flex-col sm:flex-row items-center sm:items-end mb-4 sm:mb-0">
                <div className="relative">
                  <img src={user?.profilePicture || "/placeholder.svg?height=120&width=120"} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg" />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                    <Camera size={20} className="text-gray-600" />
                  </button>
                </div>
                <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="text-4xl font-bold text-white shadow-text">{user?.name}</h1>
                  <p className="text-xl text-white shadow-text mt-1">{user?.username}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-3 bg-white text-[#CC8C87] rounded-full font-semibold transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg">
                  Edit Profile
                </button>
                <button className="p-3 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-8">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <div>
                <p className="text-xl text-gray-700 font-medium">{user?.role}</p>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin size={18} className="mr-2" />
                  <span>{user?.location}</span>
                </div>
              </div>
              <div className="flex mt-4 sm:mt-0 space-x-3">
                {socialIcons.map(({ Icon, color, bg }, index) => (
                  <button key={index} className={`p-3 ${bg} rounded-full transition-all duration-300 hover:shadow-md`}>
                    <Icon size={20} className={`${color}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="bg-gray-100 rounded-full p-1 flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    className={`flex-1 flex items-center justify-center px-4 py-3 rounded-full transition-all duration-300 ${
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

            {/* Tab Content */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
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
                <InstagramStyleFavorites userId={user?.id} />
              )}

              {activeTab === 'posts' && (
                <UserPosts userId={user?.id} />
              )}

              {activeTab === 'friends' && (
                <FriendsList userId={user?.id} showUnfollowButton={true} />
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Statistiques</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Posts', value: user?.posts?.length || 0, icon: <ImageIcon size={24} className="text-blue-500" /> },
              { label: 'Followers', value: user?.followers?.length || 0, icon: <Users size={24} className="text-green-500" /> },
              { label: 'Likes', value: user?.likes || '0', icon: <Heart size={24} className="text-red-500" /> }
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                {icon}
                <p className="font-bold text-3xl mt-2 text-gray-800">{value}</p>
                <p className="text-gray-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage2;