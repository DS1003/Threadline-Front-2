import React, { useState, useEffect } from 'react';
import { Button } from "./Button";
import { Avatar, AvatarImage } from "./Avatar";
import { UserMinus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/ApiService';

const FriendsList = ({ userId, showUnfollowButton = true }) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleProfileClick = (friendId) => {
    navigate(`/profileBis/${friendId}`);
  };

  const fetchFollowedUsers = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const endpoint = `/userFollow/getFollowedUsers/${userId}`;
      const response = await apiService.request('GET', endpoint, null, currentUser.token);
      if (response && response.users) {
        setFriends(response.users);
      }
    } catch (error) {
      console.error('Error fetching followed users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowedUsers();
  }, [userId]);

  const handleUnfollow = async (friendId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      await apiService.request('DELETE', `/userFollow/unfollow/${friendId}`, null, currentUser.token);
      setFriends(friends.filter(friend => friend.id !== friendId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (isLoading) {
    return <div>Chargement des amis...</div>;
  }

  if (!userId) {
    return <div>Impossible de charger la liste des amis.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-white to-[#FDE8E4] rounded-3xl shadow-xl p-8 max-w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#4A4A4A] flex items-center">
          <Users className="w-8 h-8 mr-2 text-[#CC8C87]" />
          <span className="bg-gradient-to-r from-[#CC8C87] to-[#4A4A4A] text-transparent bg-clip-text">
            Amis suivis
          </span>
        </h2>
        <div className="w-12 h-12 bg-[#CC8C87] rounded-full opacity-10 animate-pulse"></div>
      </div>
      
      <div className="space-y-4 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#CC8C87] scrollbar-track-[#FDE8E4]">
        {friends.map((friend) => (
          <div 
            key={friend.id} 
            className="flex items-center space-x-4 p-4 bg-white bg-opacity-60 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-100 hover:bg-opacity-80 backdrop-blur-md"
          >
            <Avatar className="w-16 h-16 border-2 border-[#CC8C87]">
              <AvatarImage 
                src={friend.photoUrl} 
                alt={friend.photoUrl} 
                onClick={() => handleProfileClick(friend.id)}
              />
            </Avatar>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-[#4A4A4A]">{friend.firstname} {friend.lastname}</h3>
              <div className="w-16 h-1 bg-[#CC8C87] rounded-full mt-1 opacity-50"></div>
            </div>
            {showUnfollowButton && (
              <Button
                variant="outline"
                className="transition-all duration-300 bg-white text-[#CC8C87] border-[#CC8C87] hover:bg-[#CC8C87] hover:text-white"
                onClick={() => handleUnfollow(friend.id)}
              >
                <UserMinus className="w-4 h-4 mr-2" />
                Ne plus suivre
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;