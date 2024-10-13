import React, { useState, useEffect } from 'react';
import { Search, MoreHorizontal, Calendar, X } from 'lucide-react';

const MessageItem = ({ name, avatar, lastMessage }) => (
  <div className="flex items-center mb-4 p-2 hover:bg-[#CC8C87] hover:bg-opacity-10 rounded-lg transition-colors duration-200">
    <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-3 border-2 border-[#CC8C87]" />
    <div className="flex-1">
      <span className="font-semibold text-[#4A4A4A]">{name}</span>
      <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
    </div>
  </div>
);

const EventItem = ({ title, date, location }) => (
  <div className="flex items-center mb-4 p-2 hover:bg-[#CC8C87] hover:bg-opacity-10 rounded-lg transition-colors duration-200">
    <Calendar size={24} className="mr-3 text-[#CC8C87]" />
    <div>
      <h4 className="font-semibold text-[#4A4A4A]">{title}</h4>
      {date && location && (
        <p className="text-sm text-gray-500">{date} - {location}</p>
      )}
    </div> 
  </div>
);

const RightSidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('primary');

  const messages = [
    { name: 'Roger Korsgaard', avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4', lastMessage: 'Hey, how are you doing?' },
    { name: 'Terry Torff', avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4', lastMessage: 'The project is coming along nicely!' },
    { name: 'Angel Bergson', avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4', lastMessage: 'Can we schedule a call for tomorrow?' },
    { name: 'Zoe Daniels', avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4', lastMessage: 'I\'ve sent you the files you requested.' },
  ];

  const events = [
    { title: '10 Events Invites', date: '', location: '' },
    { title: 'Design System Collaboration', date: 'Thu', location: 'Harpoori Mall, HK' },
    { title: 'Web Dev 2.0 Meetup', date: 'Fri', location: 'Yoshkar-Ola, Russia' },
    { title: "Prada's Invitation Birthday", date: 'Sat', location: 'New York, USA' },
  ];

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={`fixed inset-y-0 right-0 w-fit mt-20 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
      <div className="p-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#4A4A4A] hover:text-[#CC8C87]">
          <X size={24} />
        </button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-[#4A4A4A]">Messages</h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CC8C87] text-[#4A4A4A]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex mb-4 bg-gray-100 rounded-full p-1">
            {['primary', 'general', 'requests'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 text-center py-2 rounded-full transition-colors duration-200 ${activeTab === tab ? 'bg-[#CC8C87] text-white' : 'text-[#4A4A4A]'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {messages.map((message, index) => (
            <MessageItem key={index} {...message} />
          ))}
          <button className="text-[#CC8C87] font-semibold mt-2 hover:underline">View All</button>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#4A4A4A]">Events</h2>
            <MoreHorizontal size={24} className="text-[#4A4A4A] cursor-pointer hover:text-[#CC8C87]" />
          </div>
          {events.map((event, index) => (
            <EventItem key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;