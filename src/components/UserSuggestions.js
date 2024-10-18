import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import apiService from '../services/ApiService'; // Adjust the import path as needed

const UserSuggestions = () => {
  const [users, setUsers] = useState([]);

  // Fonction pour récupérer les tailors non suivis
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur actuel depuis le localStorage
        const response = await apiService.request('GET', '/userFollow/getUnfollowedTailors', null, currentUser.token); // Appel API pour récupérer les tailors non suivis
        
        if (response && response.users) {
          setUsers(response.users); // Mettre à jour l'état avec la liste des tailors non suivis
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fonction pour suivre un utilisateur
  const handleFollow = async (userId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur actuel depuis le localStorage
      const response = await apiService.request('POST', `/userFollow/follow/${userId}`, null, currentUser.token); // Appel API pour suivre l'utilisateur

      if (response && response.message === 'Successfully followed the user') {
        // Si le suivi est un succès, retirer l'utilisateur de la liste
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-[#CC8C87]">Connaissez-vous...</h2>
      </div>
      <div className="p-4 space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Affichage de la photo de profil ou d'un avatar par défaut */}
              {user.photoUrl ? (
                <img src={user.photoUrl} alt={`${user.firstname} ${user.lastname}`} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="text-gray-500" size={20} />
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-800">{`${user.firstname} ${user.lastname}`}</h3>
                <p className="text-xs text-gray-500">TAILOR</p>
              </div>
            </div>
            {/* Bouton pour suivre */}
            <button
              className="px-4 py-1.5 text-sm bg-[#CC8C87] text-white rounded-md hover:bg-[#B77E79] transition-colors duration-300"
              onClick={() => handleFollow(user.id)} // Appel de la fonction de suivi lors du clic
            >
              Suivre
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSuggestions;
