import React from 'react';
import { MapPin, Phone, Mail, User } from 'lucide-react';

const UserInfo = ({ user }) => {
  return (
    <div className="relative bg-gradient-to-br from-[#FFF5F4] to-[#FDE8E4] rounded-3xl shadow-xl p-8 mb-10 max-w-lg mx-auto overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#CC8C87] to-[#B87872] opacity-10 animate-pulse"></div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white bg-opacity-40 rounded-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold mb-6 text-[#4A4A4A] border-b-4 border-[#CC8C87] pb-2 text-center">
          Informations Personnelles
        </h2>
        <div className="space-y-6">
          {[
            { Icon: MapPin, label: 'Adresse', value: user?.address || 'Adresse non fournie' },
            { Icon: Phone, label: 'Téléphone', value: user?.phoneNumber || 'Téléphone non fourni' },
            { Icon: Mail, label: 'Email', value: user?.email || 'Email non fourni' },
            { Icon: User, label: 'Genre', value: user?.gender === 'MALE' ? 'Homme' : 'Femme' },
          ].map(({ Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center p-5 bg-white bg-opacity-60 rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-md">
              <div className="bg-[#CC8C87] p-3 rounded-full mr-4 transition-transform duration-300 hover:rotate-12">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-grow">
                <span className="text-sm font-semibold text-[#4A4A4A] block">{label}</span>
                <p className="text-lg text-[#4A4A4A] break-all">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
