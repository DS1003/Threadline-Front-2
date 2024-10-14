import React from 'react';

const Alert = ({ children, variant = 'info' }) => {
  const baseStyles = "p-4 mb-4 rounded-lg";
  const variantStyles = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`} role="alert">
      {children}
    </div>
  );
};

export default Alert;