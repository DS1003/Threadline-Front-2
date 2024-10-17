import React from 'react'
import { useNavigate } from 'react-router-dom';
import { VerifiedIcon } from 'lucide-react'

const Badge = ({ text, color, bgColor, borderColor, shadowColor }) => (
  <span className={`
    inline-flex items-center justify-center
    relative right-1 px-1 py-1
    rounded-lg text-xs font-semibold
    ${color} ${bgColor} 
    border-2 ${borderColor}
    shadow-sm ${shadowColor}
    transform hover:scale-105 transition-all duration-300
    before:content-[''] before:absolute before:inset-0 
    before:bg-white before:opacity-20 before:rounded-lg
    after:content-[''] after:absolute after:inset-0 
    after:bg-gradient-to-br after:from-transparent after:to-black/10 after:rounded-lg
  `}>
    <span className="relative z-10">{text}</span>
  </span>
);

export default function Component(props) {

  const { user } = props;

  const numberOfRole = user.roles.length;
  const otherRole = user.roles.find((role) => role.name === 'TAILOR' || role.name === 'SELLER');

  return (
    <div className="w-full h-fit max-w-lg mb-3 bg-white rounded-lg shadow-sm p-4 relative">
      <div className='flex items-center gap-2'>
        <div className='image'>
          <img
            src={user.photoUrl}
            alt={`${user.firstname}'s profile`}
            className="w-14 h-14 rounded-full border-2 border-gray-200 shadow-md"
          />
        </div>
        <div className='englobe'>
          <div className='flex justify-between items-center'>
            <h2 className="text-lg font-bold">{user.firstname}</h2>
           
          </div>
         
            <p className="text-gray-500 text-sm flex justify-between items-center gap-2">
              {user.email}
              {otherRole?.name === 'SELLER' || otherRole?.name === 'TAILOR' ? <VerifiedIcon className="w-5 h-5 text-white fill-blue-500" /> : null}
              {
                numberOfRole === 1 ? (
                  <Badge
                    text="Simple"
                    color="text-blue-800"
                    bgColor="bg-blue-100"
                    borderColor="border-blue-300"
                    shadowColor="shadow-blue-200"
                  />
                ) : otherRole?.name === 'TAILOR' ? (
                  <Badge
                    text="Tailleur"
                    color="text-green-800"
                    bgColor="bg-green-100"
                    borderColor="border-green-300"
                    shadowColor="shadow-green-200"
                  />
                ) :
                  otherRole?.name === 'SELLER' ? (
                    <Badge
                      text="Vendeur"
                      color="text-purple-800"
                      bgColor="bg-purple-100"
                      borderColor="border-purple-300"
                      shadowColor="shadow-purple-200"
                    />
                  )
                    : null
              }
            </p>
          
        </div>
      </div>


      <div className="flex justify-between mt-5">
        <div className="text-center">
          <p className="font-bold text-lg">2.3k</p>
          <p className="text-xs text-gray-500">Follower</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">235</p>
          <p className="text-xs text-gray-500">Following</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">80</p>
          <p className="text-xs text-gray-500">Post</p>
        </div>
      </div>
    </div>
  )
}