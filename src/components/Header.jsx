// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-amber-900 shadow-xl sticky top-0 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">Sweet Delights Admin</h1>
      </div>
    </header>
  );
};

export default Header;