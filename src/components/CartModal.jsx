// src/components/CartModal.jsx (Ganti dengan kode ini)

import React from 'react';
import Button from './Button';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

// Tambahkan prop onRemoveItem
const CartModal = ({ cart, total, onClose, onCheckout, onRemoveItem }) => { 
  if (cart.length === 0) {
    // ... (Kode untuk keranjang kosong tetap sama) ...
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Keranjang Belanja</h2>
          <p className="text-gray-600 mb-6">Keranjang Anda masih kosong. Ayo tambahkan beberapa kue lezat!</p>
          <Button onClick={onClose} variant="primary" className="w-full py-3">
            Tutup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-3xl font-extrabold text-amber-800">Keranjang Anda</h2>
          <Button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-light">
            &times;
          </Button>
        </div>

        {/* Daftar Item */}
        <div className="space-y-4 mb-6">
          {cart.map((item, index) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex-1">
                <span className="text-lg text-gray-700">{item.name} ({item.quantity}x)</span>
                <span className="text-lg font-semibold text-gray-900 ml-4">{formatRupiah(item.price * item.quantity)}</span>
              </div>
              
              {/* TOMBOL HAPUS BARU */}
              <button 
                onClick={() => onRemoveItem(item.id)} // Panggil fungsi hapus dengan ID item
                className="ml-4 text-red-500 hover:text-red-700 font-bold text-sm bg-red-100 px-3 py-1 rounded transition"
                title="Hapus item dari keranjang"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>

        {/* Total Harga */}
        <div className="flex justify-between items-center text-xl font-bold border-t pt-4 mt-4">
          <span>Total Pesanan:</span>
          <span className="text-red-600">{formatRupiah(total)}</span>
        </div>
        
        {/* Tombol Checkout */}
        <div className="mt-6">
          <Button onClick={onCheckout} variant="success" className="w-full py-3 text-lg bg-green-600 hover:bg-green-700">
            ✅ Proses Pesanan (Checkout)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;