import React from 'react';
import { MapPin, Phone, Mail, User } from 'lucide-react';

const UserInfo = ({ user }) => {
  const infoItems = [
    { Icon: MapPin, label: 'Adresse', value: user?.address || 'Adresse non fournie' },
    { Icon: Phone, label: 'Téléphone', value: user?.phoneNumber || 'Téléphone non fourni' },
    { Icon: Mail, label: 'Email', value: user?.email || 'Email non fourni' },
    { Icon: User, label: 'Genre', value: user?.gender === 'MALE' ? 'Homme' : 'Femme' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#ffece8] to-[#FDE8E4] rounded-3xl shadow-lg p-6 mb-10 max-w-lg mx-auto overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-[#413d3d] text-center relative">
        <span className="text-[#CC8C87] bg-white px-3 py-2 rounded-lg">
          Informations Personnelles
        </span>
      </h2>
      <div className="space-y-4">
        {infoItems.map(({ Icon, label, value }) => (
          <div
            key={label}
            className="group flex items-center p-4 bg-white bg-opacity-60 rounded-2xl transition-all duration-300 hover:shadow-md hover:bg-opacity-80 backdrop-filter backdrop-blur-sm"
          >
            <div className="bg-gradient-to-br from-[#CC8C87] to-[#B87872] p-3 rounded-full mr-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-grow">
              <span className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wide block">{label}</span>
              <p className="text-sm text-[#4A4A4A] mt-1 truncate">{value}</p>
            </div>
            <div className="w-1 h-8 bg-gradient-to-b from-[#CC8C87] to-transparent rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;