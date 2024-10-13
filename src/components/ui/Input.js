// src/components/ui/input.js
import React from 'react';

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 ${className}`}
    {...props}
  />
));

Input.displayName = 'Input';

export { Input };
