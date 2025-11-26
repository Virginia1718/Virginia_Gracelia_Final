// src/features/CakeList.jsx

import React from 'react';
import CakeCard from './CakeCard';

const CakeList = ({ cakes, onUpdate, onDelete }) => {
  if (!cakes || cakes.length === 0) {
    return (
      <p className="col-span-full text-center text-2xl text-gray-500 py-16 bg-white rounded-lg shadow-md">
        Katalog masih kosong.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cakes.map((cake) => (
        <CakeCard
          key={cake.id}
          cake={cake}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CakeList;