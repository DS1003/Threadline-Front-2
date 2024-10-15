import React from 'react';

const Loader = () => {
  return (
    <div className=" h-screen ml-[44%] mt-2 bg-gray-100">
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#E5B1AA" strokeWidth="8" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="#CC8C87" strokeWidth="8" strokeDasharray="280" strokeDashoffset="280">
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            from="280"
            to="0"
            repeatCount="indefinite"
          />
        </circle>
        <path d="M50 25 L50 75 M25 50 L75 50" stroke="#4A4A4A" strokeWidth="8" strokeLinecap="round">
          <animate
            attributeName="stroke-opacity"
            dur="1.5s"
            values="1;0.2;1"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default Loader;