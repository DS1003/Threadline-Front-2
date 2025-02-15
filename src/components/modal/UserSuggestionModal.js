import React, { useState, useEffect } from 'react';
import { User, Share2, Check, X } from 'lucide-react';
import apiService from '../../services/ApiService';

const UserSuggestionModal = ({ postId, onClose }) => {
  const [users, setUsers] = useState([]);
  const [sharingStates, setSharingStates] = useState({});

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

  const handleShare = async (userId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      
      // Appeler l'API pour partager le post avec un utilisateur spécifique
      const response = await apiService.request('POST', `/posts/share/${postId}/to/${userId}`, null, currentUser.token);
  
      if (response && response.message === 'Post shared successfully.') {
        setSharingStates((prev) => ({ ...prev, [userId]: true }));
  
        // Retirer l'utilisateur de la liste après partage
        setTimeout(() => {
          setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
          setSharingStates(prev => {
            const newState = { ...prev };
            delete newState[userId];
            return newState;
          });
        }, 1000); // Durée de l'animation
      }
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-[#CC8C87]">Partager avec des amis</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-3 hover:bg-gray-50 transition-all duration-300 rounded-lg ${
                sharingStates[user.id] ? 'animate-shareSuccess' : ''
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
                </div>
              </div>
              <button
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 flex items-center space-x-1 group ${
                  sharingStates[user.id]
                    ? 'bg-green-500 text-white'
                    : 'bg-transparent border border-[#CC8C87] text-[#CC8C87] hover:bg-[#CC8C87] hover:text-white'
                }`}
                onClick={() => handleShare(user.id)}
                disabled={sharingStates[user.id]}
              >
                {sharingStates[user.id] ? (
                  <Check size={16} className="animate-checkmark" />
                ) : (
                  <Share2 size={16} className="group-hover:scale-110 transition-transform duration-300" />
                )}
                <span>{sharingStates[user.id] ? 'Partagé' : 'Partager'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSuggestionModal;