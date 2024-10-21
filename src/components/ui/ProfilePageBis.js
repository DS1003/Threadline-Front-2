import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Image as ImageIcon, Users, Plus, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import MeasurementsList from './ MeasurementsList';
import FriendsList from './FriendList';
import { Card, CardContent } from './Card';
import { Button } from './Button';
import apiService from '../../services/ApiService';
import UserPostsComponents from './UserPostsComponents';


const ProfilePageBis = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [activeTab, setActiveTab] = useState('info');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const measurementsPerPage = 1;

  useEffect(() => {
    const fetchUserAndMeasurements = async () => {
      setIsLoading(true);
      try {
        const userResponse = await apiService.request('GET', `/users/user-by-id/${userId}`);
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

  const paginatedMeasurements = measurements.slice(
    currentPage * measurementsPerPage,
    (currentPage + 1) * measurementsPerPage
  );

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
                    <Card className="bg-[#FFF5F4] rounded-2xl shadow-md overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h2 className="text-xl font-bold text-[#E5A6A6]">Mesures</h2>
                          {measurements.length > 0 && (
                            <Button
                              onClick={() => setIsExpanded(!isExpanded)}
                              variant="ghost"
                              size="sm"
                              className="text-[#E5A6A6]"
                            >
                              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </Button>
                          )}
                        </div>

                        <AnimatePresence>
                          {isExpanded && measurements.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              {paginatedMeasurements.map((m) => (
                                <div key={m.id} className="bg-white rounded-lg p-3 mb-2">
                                  <MeasurementsList measurement={m} />
                                </div>
                              ))}

                              <div className="flex justify-between items-center mt-2">
                                <Button
                                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                                  disabled={currentPage === 0}
                                  size="sm"
                                  className="bg-[#E5A6A6] hover:bg-[#D68F8F] text-white"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-sm text-[#E5A6A6] font-medium">
                                  {currentPage + 1} / {Math.ceil(measurements.length / measurementsPerPage)}
                                </span>
                                <Button
                                  onClick={() => setCurrentPage((prev) => Math.min(Math.ceil(measurements.length / measurementsPerPage) - 1, prev + 1))}
                                  disabled={currentPage === Math.ceil(measurements.length / measurementsPerPage) - 1}
                                  size="sm"
                                  className="bg-[#E5A6A6] hover:bg-[#D68F8F] text-white"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {measurements.length === 0 && (
                          <p>Aucune mesure disponible.</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

{activeTab === 'posts' && (
  <UserPostsComponents user={user} />
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