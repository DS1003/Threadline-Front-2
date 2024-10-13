import React from 'react';
import { MessageCircle } from 'lucide-react';

const MessageButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-[#CC8C87] text-white hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#CC8C87] focus:ring-opacity-50"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default MessageButton;