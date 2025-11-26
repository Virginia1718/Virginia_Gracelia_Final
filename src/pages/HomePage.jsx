// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-3xl space-y-8 animate-fade-in-up">
        {/* Hero Title */}
        <h1 className="text-6xl font-extrabold text-amber-800 drop-shadow-sm">
          Sweet Delights <span className="text-amber-600">Bakery</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-700 leading-relaxed">
          Selamat datang di rumah kue terbaik di kota! Kami menyajikan kehangatan 
          melalui kue-kue artisanal yang dibuat dari bahan premium dan penuh cinta. 
          Dari <strong>Red Velvet</strong> yang lembut hingga <strong>Tiramisu</strong> yang memikat, 
          temukan kebahagiaan di setiap gigitan.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <Link to="/menu">
            <Button variant="primary" className="py-4 px-8 text-lg shadow-xl hover:scale-105 transform transition">
              🛍️ Pesan Sekarang
            </Button>
          </Link>
          {/* Tombol Login Admin sudah dihapus dari sini */}
        </div>

        {/* Visual Decoration (Telah diperbarui) */}
        <div className="mt-12 grid grid-cols-3 gap-4 opacity-80">
           {/* Gambar 1: Tiramisu Cheesecake */}
           <img 
             src="https://bakewithzoha.com/wp-content/uploads/2023/12/tiramisu-cheesecake-sliced-1-scaled.jpg" 
             className="rounded-lg shadow-md rotate-3" 
             alt="Tiramisu Cheesecake" 
           />
           {/* Gambar 2: Red Velvet Cake */}
           <img 
             src="https://www.afarmgirlsdabbles.com/wp-content/uploads/2025/02/Red-Velvet-Cake_0014v.jpg" 
             className="rounded-lg shadow-md -mt-4" 
             alt="Red Velvet Cake" 
           />
           {/* Gambar 3: Kue Onde Kelapa */}
           <img 
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Klepon_Khas_Tulungagung.jpg/330px-Klepon_Khas_Tulungagung.jpg" 
             className="rounded-lg shadow-md -rotate-3" 
             alt="Kue Onde Kelapa" 
           />
        </div>
      </div>
    </div>
  );
};

export default HomePage;