import React, { useState, useEffect } from 'react';
import { MapPin, MoreHorizontal, Plus, User, Heart, Image as ImageIcon, Users, Twitter, Facebook, Instagram, Youtube, Twitch, Share2 } from 'lucide-react';

const ProfilePage2 = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    // Simulating user data fetch
    setUser({
      name: 'Marina Valentine',
      username: '@marina_valentine',
      role: 'Lead Product Designer at Apple',
      location: 'Los Angeles, California',
      followers: 930,
      posts: 82,
      likes: '5.7k',
      coverPhoto: 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666'
    });
  }, []);

  const tabs = [
    { icon: <ImageIcon className="w-5 h-5" />, label: "Posts", value: "posts" },
    { icon: <User className="w-5 h-5" />, label: "Info", value: "info" },
    { icon: <Heart className="w-5 h-5" />, label: "Favorites", value: "favorites" },
    { icon: <Users className="w-5 h-5" />, label: "Friends", value: "friends" },
  ];

  const badges = [
    { color: 'bg-yellow-400', icon: '🏆' },
    { color: 'bg-purple-500', icon: '🎮' },
    { color: 'bg-green-500', icon: '🌟' },
    { color: 'bg-blue-500', icon: '💎' },
    { color: 'bg-gray-00', icon: '❤️' },
  ];

  const socialIcons = [
    { Icon: Facebook, color: 'text-blue-600' },
    { Icon: Twitter, color: 'text-blue-400' },
    { Icon: Instagram, color: 'text-pink-600' },
    { Icon: Youtube, color: 'text-red-600' },
    { Icon: Twitch, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${user?.coverPhoto})` }}></div>
            <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end">
              <img src="/placeholder.svg?height=120&width=120" alt="Profile" className="w-32 h-32 rounded-full border-4 border-white" />
              <div className="ml-4 mb-4">
                <h1 className="text-3xl font-bold text-white shadow-text">{user?.name}</h1>
                <p className="text-xl text-white shadow-text">{user?.username}</p>
              </div>
            </div>
          </div>

          <div className="pt-24 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">{user?.role}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{user?.location}</span>
                </div>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="text-center">
                    <p className="font-bold text-xl">{user?.posts}</p>
                    <p className="text-gray-500">posts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl">{user?.followers}</p>
                    <p className="text-gray-500">followers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl">{user?.likes}</p>
                    <p className="text-gray-500">likes</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-semibold">
                  Add Friend +
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex mt-6 space-x-4">
              {socialIcons.map(({ Icon, color }, index) => (
                <Icon key={index} size={24} className={`${color} cursor-pointer`} />
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    className={`flex items-center justify-center px-6 py-3 font-semibold transition-all duration-300 ${activeTab === tab.value
                      ? 'border-b-2 border-blue-500 text-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'posts' && (
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-200 aspect-square rounded-lg"></div>
                  ))}
                </div>
              )}
              {activeTab === 'info' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">About Me</h3>
                  <p>
                    Nothing to display
                  </p>
                </div>
              )}
              {
                activeTab === 'favorites' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Favorites</h3>
                    <p>No favorites yet.</p>
                  </div>
                )
              }
              {activeTab === 'friends' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Friends</h3>
                  <p>No friends yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <div key={index} className={`${badge.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
                {badge.icon}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Friends</h2>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="text-center">
                <img src="/placeholder.svg?height=60&width=60" alt={`Friend ${index + 1}`} className="w-12 h-12 rounded-full mx-auto" />
                <p className="mt-2 text-sm">Friend {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage2;