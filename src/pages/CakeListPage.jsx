// src/pages/CakeListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getCakes } from '../API';
import CakeFormPage from './CakeFormPage';
import CakeList from '../features/CakeList';
import Button from '../components/Button';

const CakeListPage = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCake, setEditingCake] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchCakes = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getCakes();
      setCakes(data);
    } catch (err) {
      console.error("Gagal mengambil kue:", err);
      setError(err.message || 'Terjadi kesalahan saat mengambil data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCakes();
  }, [fetchCakes]);

  const handleSuccess = () => {
    setEditingCake(null);
    setIsAdding(false);
    fetchCakes(); 
  };

  const handleDeleteSuccess = (deletedId) => {
    setCakes(cakes.filter(cake => cake.id !== deletedId));
  };
  
  if (loading) return <p className="text-center mt-12 text-xl font-medium">Memuat data kue...</p>;
  if (error) return <p className="text-center mt-12 text-xl text-red-600 font-bold">Error: {error}</p>;

  if (isAdding || editingCake) {
    return (
      <div className="py-10 bg-gray-50 min-h-screen">
        <CakeFormPage
          initialCake={editingCake}
          onSuccess={handleSuccess}
          onCancel={() => {
            setEditingCake(null);
            setIsAdding(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-7">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-amber-900">🍰 Daftar Kue...</h1>
        <Button onClick={() => setIsAdding(true)}  className="py-3 px-6 shadow-xl transform hover:scale-105 bg-amber-900 hover:bg-amber-700 text-white">
          + Tambah Kue Baru
        </Button>
      </div>

      <CakeList
        cakes={cakes}
        onUpdate={setEditingCake}
        onDelete={handleDeleteSuccess}
      />
      
    </div>
  );
};

export default CakeListPage;