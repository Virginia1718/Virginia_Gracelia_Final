// src/pages/CustomerMenuPage.jsx (Ganti dengan kode ini, pastikan Anda telah mengimpor CartModal dan addOrder)

import React, { useState, useEffect } from 'react';
import { getCakes, addOrder } from '../API'; 
import Button from '../components/Button';
import CartModal from '../components/CartModal'; 

const CustomerMenuPage = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  useEffect(() => {
    // ... (Logika fetchData tetap sama) ...
    const fetchData = async () => {
      try {
        const data = await getCakes();
        setCakes(data);
      } catch (error) {
        console.error("Error fetching cakes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- LOGIKA KERANJANG: TAMBAH ---
  const handleAddToCart = (cake) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === cake.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === cake.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...cake, quantity: 1 }];
      }
    });
    alert(`${cake.name} ditambahkan ke keranjang!`);
  };

  // --- LOGIKA KERANJANG: HAPUS BARU ---
  const handleRemoveItem = (idToRemove) => {
    setCart(prevCart => {
      // Filter array, hanya simpan item yang ID-nya TIDAK sama dengan ID yang mau dihapus
      return prevCart.filter(item => item.id !== idToRemove);
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  // --- LOGIKA CHECKOUT ---
  const handleCheckout = async () => {
    const customerName = prompt("Masukkan Nama Anda untuk melanjutkan pemesanan:");
    if (!customerName) return;

    const total = calculateTotal();
    const orderItemsList = cart.map(item => `${item.name} (${item.quantity}x)`).join(', ');

    const newOrder = {
        customerId: "999", 
        cakeName: orderItemsList,
        quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: total,
        status: "Pending",
        orderDate: new Date().toISOString().split('T')[0] 
    };

    try {
        await addOrder(newOrder);
        alert(`Pesanan atas nama ${customerName} (Total: ${formatRupiah(total)}) berhasil dikirim!`);
        
        setCart([]);
        setIsModalOpen(false);
    } catch (error) {
        alert("Gagal memproses pesanan. Periksa koneksi JSON Server Anda.");
        console.error("Checkout Error:", error);
    }
  };


  if (loading) return <div className="text-center mt-20 text-2xl font-bold text-amber-600">Sedang menyiapkan menu...</div>;

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      
      {/* Header Menu Pelanggan tetap sama */}
      <div className="flex justify-between items-center mb-10 sticky top-0 bg-white/90 backdrop-blur-sm py-4 z-10 border-b">
        <h1 className="text-4xl font-bold text-amber-800 font-serif">Menu Spesial Hari Ini</h1>
        
        {/* Tombol Buka Keranjang tetap sama */}
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center transform hover:scale-105 transition"
        >
          🛒 Keranjang ({cart.length}) - Total: {formatRupiah(calculateTotal())}
        </Button>
      </div>

      {/* Grid Menu tetap sama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cakes.map((cake) => (
          // ... (Kode untuk Cake Card tetap sama) ...
           <div key={cake.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 group">
             <div className="h-64 overflow-hidden relative">
                <img 
                  src={cake.imageUrl} 
                  alt={cake.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/300?text=No+Image"; }}
                />
                <div className="absolute bottom-0 right-0 bg-amber-600 text-white px-4 py-1 rounded-tl-xl font-bold">
                  {formatRupiah(cake.price)}
                </div>
             </div>
             
             <div className="p-6">
               <h3 className="text-2xl font-bold text-gray-800 mb-2">{cake.name}</h3>
               <p className="text-gray-600 mb-6 text-sm line-clamp-2">{cake.description}</p>
               
               <Button 
                 onClick={() => handleAddToCart(cake)} 
                 className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md active:scale-95 transition"
               >
                 + Tambah ke Keranjang
               </Button>
             </div>
           </div>
        ))}
      </div>
      
      {/* Modal Keranjang */}
      {isModalOpen && (
        <CartModal 
          cart={cart}
          total={calculateTotal()}
          onClose={() => setIsModalOpen(false)}
          onCheckout={handleCheckout}
          onRemoveItem={handleRemoveItem} // <--- PASSING FUNGSI HAPUS BARU
        />
      )}
    </div>
  );
};

export default CustomerMenuPage;