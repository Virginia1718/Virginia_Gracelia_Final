// src/pages/CakeFormPage.jsx
import React, { useState, useEffect } from 'react';
import { addCake, updateCake } from '../API';
import Button from '../components/Button';
import FormInput from '../components/FormInput'; // Pastikan FormInput ada dan diimport

const CakeFormPage = ({ initialCake, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const isEditMode = initialCake !== null && initialCake !== undefined;

  useEffect(() => {
    if (isEditMode) {
      setFormData(initialCake);
    } else {
      setFormData({ name: '', description: '', price: 0, imageUrl: '' });
    }
  }, [initialCake, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Jika mode edit, kirim semua data form termasuk ID yang sudah ada di initialCake
    // Jika mode tambah, id akan otomatis dibuat oleh json-server
    const dataToSave = isEditMode ? { ...formData } : { ...formData, id: undefined }; 

    try {
      if (isEditMode) {
        await updateCake(initialCake.id, dataToSave);
        alert(`Data kue ${dataToSave.name} berhasil diubah!`);
      } else {
        await addCake(dataToSave);
        alert('Kue baru berhasil ditambahkan!');
      }
      onSuccess();
    } catch (error) {
      console.error('API Error:', error);
      alert(`Gagal menyimpan data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-amber-900 pb-2">
        {isEditMode ? '📝 Ubah Detail Kue' : '➕ Tambah Kue Baru'}
      </h2>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Nama Kue" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <FormInput 
          label="Deskripsi" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          textarea 
        />
        <FormInput 
          label="Harga (Rp)" 
          name="price" 
          type="number" 
          value={formData.price} 
          onChange={handleChange} 
          required 
        />
        <FormInput 
          label="URL Gambar" 
          name="imageUrl" 
          value={formData.imageUrl} 
          onChange={handleChange} 
          required 
        />
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>Batal</Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Tambahkan Kue')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CakeFormPage;