import React from 'react';
import { Home, Users, Calendar, Video, User, ShoppingBag } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Feed', active: true },
    { icon: Users, label: 'Friends' },
    { icon: Calendar, label: 'Event', notificationCount: 4 },
    { icon: Video, label: 'Watch Videos' },
    { icon: User, label: 'Vendeurs' },
    { icon: ShoppingBag, label: 'Articles' },
  ];

  return (
    <aside className="bg-white rounded-lg p-4 max-w-lg w-full md:w-64 lg:w-full">
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200
              ${item.active ? 'bg-[#cc8c8752] text-[#CC8C87]' : 'text-gray-700 hover:bg-[#cc8c87ab]'}
            `}
          >
            <item.icon size={20} className="mr-3 flex-shrink-0" />
            <span className="text-sm md:text-base">{item.label}</span>
            {item.notificationCount && (
              <span className="ml-auto bg-[#CC8C87] text-white text-xs rounded-full px-2 py-1">
                {item.notificationCount}
              </span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;