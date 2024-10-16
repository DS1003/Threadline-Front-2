import React from 'react';
import { MapPin, MoreHorizontal, Plus } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Banner and Profile Section */}
        <div className="relative">
          <div className="h-40 bg-gradient-to-r from-red-400 via-purple-500 to-blue-500"></div>
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <img src="/api/placeholder/100/100" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white" />
          </div>
        </div>
        
        <div className="pt-16 px-4 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">Jesselyn Wang</h1>
              <p className="text-gray-600">Lead Product Designer at Apple</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin size={16} className="mr-1" />
                <span>Seoul, South Korea</span>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span className="mr-3">{6476} followers</span>
                <span>{500}+ connections</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">Follow</button>
              <button className="px-4 py-1 border border-gray-300 rounded-full hover:bg-gray-100">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex mt-4 space-x-2">
            <img src="/api/placeholder/24/24" alt="Apple" className="w-6 h-6 rounded" />
            <img src="/api/placeholder/24/24" alt="Kretya Studio" className="w-6 h-6 rounded" />
          </div>
        </div>

        {/* Posts Section */}
        <div className="px-4 py-4 border-t">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 h-40 rounded-lg"></div>
            <div className="bg-gray-200 h-40 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* People also viewed Section */}
      <div className="max-w-4xl mx-auto mt-4 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">People also viewed</h2>
        <ul className="space-y-3">
          {['Amanda Reyes', 'Han Ryujin', 'Paul Arriola', 'Tafari Sans', 'Velasco Timmber', 'Han Soo Hee', 'Salsabilla Aslley'].map((name, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="/api/placeholder/40/40" alt={name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-gray-500">
                    {index === 0 ? 'Marketing Manager at Alibaba Group' :
                     index === 1 ? 'CTO at Google' :
                     index === 2 ? 'Lead Engineer at Tesla' :
                     index === 3 ? 'Principal Designer at Spotify' :
                     index === 4 ? 'Sr. Product Designer at Netflix' :
                     index === 5 ? 'Actor, Public Figure' :
                     'Content Creator'}
                  </p>
                </div>
              </div>
              <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-100">
                <Plus size={18} />
              </button>
            </li>
          ))}
        </ul>
        <button className="text-blue-600 font-semibold mt-4 hover:underline">Show more</button>
      </div>
    </div>
  );
};

export default ProfilePage;