import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Image as ImageIcon, Users } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import MeasurementsList from './ MeasurementsList';
import FriendsList from './FriendList';
import apiService from '../../services/ApiService';

const ProfilePageBis = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndMeasurements = async () => {
      setIsLoading(true);
      try {
        const userResponse = await apiService.request('GET', `/users/${userId}`);
        const fetchedUser = userResponse.user ? userResponse.user : userResponse.data.user;
        setUser(fetchedUser);

        const measurementsResponse = await apiService.request('GET', `/measurements/${userId}`, null, null);
        setMeasurements(measurementsResponse.data);
      } catch (error) {
        console.error("Error fetching user or measurements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserAndMeasurements();
    }
  }, [userId]);

  const coverPhoto = 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666';

  const tabs = [
    { icon: <User className="w-5 h-5" />, label: "Infos", value: "info" },
    { icon: <ImageIcon className="w-5 h-5" />, label: "Posts", value: "posts" },
    { icon: <Users className="w-5 h-5" />, label: "Amis", value: "friends" },
  ];

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

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
                    {measurements && measurements.length > 0 ? (
                      <MeasurementsList measurement={measurements[0]} />
                    ) : (
                      <p>Aucune mesure disponible.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'posts' && (
                <UserPosts posts={user?.posts || []} />
              )}

              {activeTab === 'friends' && (
                <FriendsList userId={user.id} showUnfollowButton={false} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageBis;