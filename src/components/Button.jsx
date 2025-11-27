// src/components/Button.jsx
import React from 'react';


const colorMap = {
  primary: 'bg-amber-600 hover:bg-amber-700 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
};

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const baseClasses = `px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  const variantClasses = colorMap[variant] || colorMap.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;