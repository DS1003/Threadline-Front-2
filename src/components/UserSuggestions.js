import React, { useState, useEffect } from 'react';
import { User, UserPlus, Check } from 'lucide-react';
import apiService from '../services/ApiService';

const UserSuggestions = () => {
  const [users, setUsers] = useState([]);
  const [followingStates, setFollowingStates] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const response = await apiService.request('GET', '/userFollow/getUnfollowedTailors', null, currentUser.token);
        
        if (response && response.users) {
          setUsers(response.users);
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const response = await apiService.request('POST', `/userFollow/follow/${userId}`, null, currentUser.token);

      if (response && response.message === 'Successfully followed the user') {
        setFollowingStates(prev => ({ ...prev, [userId]: true }));
        
        // Attendre la fin de l'animation avant de retirer l'utilisateur
        setTimeout(() => {
          setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
          setFollowingStates(prev => {
            const newState = { ...prev };
            delete newState[userId];
            return newState;
          });
        }, 1000); // Durée de l'animation + un petit délai
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl mt-2 shadow-lg overflow-hidden border border-gray-100">
      <div className="p-4 border-b  border-gray-100">
        <h2 className="text-lg font-semibold text-[#CC8C87]">Suggestions d'amis</h2>
      </div>
      <div className="p-4 space-y-4">
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`flex items-center justify-between p-3 hover:bg-gray-50 transition-all duration-300 rounded-lg ${
              followingStates[user.id] ? 'animate-followSuccess' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              {user.photoUrl ? (
                <img src={user.photoUrl} alt={`${user.firstname} ${user.lastname}`} className="w-12 h-12 rounded-full object-cover shadow-sm" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CC8C87] to-[#B77E79] flex items-center justify-center shadow-sm">
                  <User className="text-white" size={24} />
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-800">{`${user.firstname} ${user.lastname}`}</h3>
                <p className="text-xs text-gray-500 font-semibold">TAILOR</p>
              </div>
            </div>
            <button
              className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 flex items-center space-x-1 group ${
                followingStates[user.id]
                  ? 'bg-green-500 text-white'
                  : 'bg-transparent border border-[#CC8C87] text-[#CC8C87] hover:bg-[#CC8C87] hover:text-white'
              }`}
              onClick={() => handleFollow(user.id)}
              disabled={followingStates[user.id]}
            >
              {followingStates[user.id] ? (
                <Check size={16} className="animate-checkmark" />
              ) : (
                <UserPlus size={16} className="group-hover:scale-110 transition-transform duration-300" />
              )}
              <span>{followingStates[user.id] ? 'Suivi' : 'Suivre'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSuggestions;