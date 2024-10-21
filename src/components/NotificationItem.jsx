import React from 'react';

const NotificationItem = ({ notification }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <p>{notification.message}</p>
    </div>
  );
};

export default NotificationItem;
