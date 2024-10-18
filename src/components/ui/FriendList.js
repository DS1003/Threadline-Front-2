import React from 'react';
import { Button } from "./Button";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { UserMinus, Users } from 'lucide-react';

const FriendsList = () => {
  // This is mock data. In a real application, you would fetch this data from an API
  const friends = [
    { id: 1, name: 'Alice Johnson', photo: '/api/placeholder/100/100' },
    { id: 3, name: 'Charlie Brown', photo: '/api/placeholder/100/100' },
  ];

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
      <div className="space-y-4">
        {friends.map((friend) => (
          <div 
            key={friend.id} 
            className="flex items-center space-x-4 p-4 bg-white bg-opacity-60 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-100 hover:bg-opacity-80 backdrop-blur-md"
          >
            <Avatar className="w-16 h-16 border-2 border-[#CC8C87]">
              <AvatarImage src={friend.photo} alt={friend.name} />
            </Avatar>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-[#4A4A4A]">{friend.name}</h3>
              <div className="w-16 h-1 bg-[#CC8C87] rounded-full mt-1 opacity-50"></div>
            </div>
            <Button
              variant="outline"
              className="transition-all duration-300 bg-white text-[#CC8C87] border-[#CC8C87] hover:bg-[#CC8C87] hover:text-white"
              onClick={() => {/* Logique pour ne plus suivre */}}
            >
              <UserMinus className="w-4 h-4 mr-2" />
              Ne plus suivre
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="ghost" className="text-[#CC8C87] hover:text-[#B87872] hover:bg-[#FDE8E4]">
          Voir tous les amis
        </Button>
      </div>
    </div>
  );
};

export default FriendsList;