// src/components/ui/button.js
import React from 'react';

const Button = ({ variant, size, className, children, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none';
  const variants = {
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-200',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
  };
  const sizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
