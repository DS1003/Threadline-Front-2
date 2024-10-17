import React from 'react'
import { VerifiedIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function Component(props) {
  const navigate = useNavigate();

  const {user} = props;

  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  return (
    <div className="w-full  h-fit max-w-lg mb-3  bg-white rounded-lg shadow-sm p-4 relative">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.photoUrl}
          alt="Profilepicture"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="flex items-center gap-1">
            <h2 className="text-lg font-bold">{user.firstname}</h2>
            <VerifiedIcon className="w-5 h-5 text-[#CC8C87]" />
          </div>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
      <button onClick={handleProfileClick}
      className="absolute top-4 right-4 bg-[#CC8C87] hover:bg-[#cc8c87d2] text-white text-sm font-semibold py-2 px-4 rounded-full transition-colors duration-300">
          
        Voir profil
      </button>
      <div className="flex justify-between bg-gray-100 rounded-lg p-3">
        <div className="text-center">
          <p className="font-bold">2.3k</p>
          <p className="text-xs text-gray-500">Follower</p>
        </div>
        <div className="text-center">
          <p className="font-bold">235</p>
          <p className="text-xs text-gray-500">Following</p>
        </div>
        <div className="text-center">
          <p className="font-bold">80</p>
          <p className="text-xs text-gray-500">Post</p>
        </div>
      </div>
    </div>
  )
}