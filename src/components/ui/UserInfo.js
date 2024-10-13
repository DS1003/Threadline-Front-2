import React from 'react';
import { MapPin, Phone, Mail, User } from 'lucide-react';

const UserInfo = ({ user }) => {
  return (
    <div className="bg-gradient-to-br font-bold from-white to-[#FFF5F4] rounded-xl border-2  shadow-lg p-8 mb-6 max-w-md mx-auto">
      <h2 className="text-3xl  mb-6 text-[#4A4A4A] border-b-2 border-[#CC8C87] pb-2 text-center">Informations Personnelles</h2>
      <div className="space-y-4">
        {[
          { Icon: MapPin, label: 'Adresse', value: user.address },
          { Icon: Phone, label: 'Téléphone', value: user.phone },
          { Icon: Mail, label: 'Email', value: user.email },
          { Icon: User, label: 'Genre', value: user.gender },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="flex items-center p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-102">
            <div className="bg-[#CC8C87] p-3 rounded-full mr-4">
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
  );
};

export default UserInfo;