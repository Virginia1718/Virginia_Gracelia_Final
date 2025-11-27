// src/features/CakeCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import { deleteCake } from '../API';

const CakeCard = ({ cake, onUpdate, onDelete }) => {
  
  // Fungsi untuk memformat harga menjadi Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleDelete = async () => {
    // Konfirmasi sebelum menghapus
    if (window.confirm(`Yakin ingin menghapus kue ${cake.name}?`)) {
      try {
        // Panggil fungsi delete dari API
        await deleteCake(cake.id);
        alert(`Kue ${cake.name} berhasil dihapus.`);
        // Panggil fungsi onDelete dari parent untuk memperbarui daftar
        onDelete(cake.id);
      } catch (error) {
        console.error("Gagal menghapus kue:", error);
        alert(`Gagal menghapus kue: ${error.message}`);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out">
      
      {/* Gambar Kue*/}
      <img
        src={cake.imageUrl}
        alt={cake.name}
        className="w-full h-48 object-cover transition-opacity duration-500 ease-in-out"
        // Placeholder jika gambar asli gagal dimuat
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src="https://via.placeholder.com/250/cccccc/333333?text=Gambar+Tidak+Tersedia"; 
        }}
      />

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{cake.name}</h3>
        
        {/* Deskripsi dipotong jika terlalu panjang */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cake.description}</p>
        
        {/* Harga dalam format Rupiah */}
        <p className="text-2xl font-extrabold text-amber-700 mb-4">
          {formatRupiah(cake.price)}
        </p>

        <div className="flex space-x-3">
          {/* Tombol Ubah (mengaktifkan mode edit) */}
          <Button 
            onClick={() => onUpdate(cake)} 
            variant="primary" 
            className="flex-1 py-2" // Diperbaiki sedikit agar lebih ramping
          >
            Ubah
          </Button>

          {/* Tombol Hapus */}
          <Button 
            onClick={handleDelete} 
            variant="danger" 
            className="flex-1 py-2" // Diperbaiki sedikit agar lebih ramping
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

CakeCard.propTypes = {
  cake: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CakeCard;