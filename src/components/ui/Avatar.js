// src/components/ui/avatar.js
import React from 'react';

export const Avatar = ({ children, className }) => {
  return (
    <div className={`inline-flex items-center justify-center rounded-full ${className}`}>
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-full object-cover"
    />
  );
};

export const AvatarFallback = ({ children }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-300 rounded-full text-white">
      {children}
    </div>
  );
};
