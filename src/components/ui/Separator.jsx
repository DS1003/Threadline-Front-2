// src/components/ui/Separator.jsx
import React from 'react';

const Separator = ({ className }) => {
  return (
    <hr className={`border-t border-gray-300 my-4 ${className}`} />
  );
};

export default Separator;
