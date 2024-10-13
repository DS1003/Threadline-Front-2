import React from 'react';
import { Home, Users, Calendar, Video, Image, ShoppingBag, File } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Feed', active: true },
    { icon: Users, label: 'Friends' },
    { icon: Calendar, label: 'Event', notificationCount: 4 },
    { icon: Video, label: 'Watch Videos' },
    { icon: Image, label: 'Photos' },
    { icon: ShoppingBag, label: 'Marketplace' },
    { icon: File, label: 'Files', notificationCount: 7 },
  ];

  return (
    <aside className=" bg-white p-4 max-w-lg">
        
      <nav>
        {menuItems.map((item, index) => (
          <div key={index} className={`flex items-center p-2 rounded-lg mb-2 ${item.active ? 'bg-[#cc8c8752] text-[#CC8C87]' : 'text-gray-700 hover:bg-[#cc8c87ab]'}`}>
            <item.icon size={20} className="mr-3" />
            <span>{item.label}</span>
            {item.notificationCount && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">{item.notificationCount}</span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;