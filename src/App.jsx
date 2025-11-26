// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import CustomerMenuPage from './pages/CustomerMenuPage';
import CakeListPage from './pages/CakeListPage'; 
import Modal from './components/Modal'; 

// --- Komponen Modal Login ---
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kredensial Sederhana
    if (username === 'admin' && password === '12345') {
      onLogin();
    } else {
      setError('Username atau Password salah. Coba: admin / 12345');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login Admin Sweet Delights">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500"
            id="username"
            type="text"
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) => {setUsername(e.target.value); setError('');}}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setError('');}}
          />
        </div>
        
        <div className="flex items-center justify-end">
          <button
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </Modal>
  );
};


// --- Komponen Navigasi Utama ---
const Navigation = ({ openLoginModal }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? "bg-amber-700 text-white" : "text-amber-100 hover:text-white";

  return (
    <nav className="bg-amber-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold text-white tracking-widest">
          🍰 Sweet Delights
        </div>
        <div className="space-x-4">
          <Link to="/" className={`px-4 py-2 rounded-lg font-medium transition ${isActive('/')}`}>Home</Link>
          <Link to="/menu" className={`px-4 py-2 rounded-lg font-medium transition ${isActive('/menu')}`}>Menu Pelanggan</Link>
          
          {/* Tombol Login Admin - Hanya muncul jika TIDAK di halaman Admin */}
          {location.pathname !== '/admin' && (
             <button 
                onClick={openLoginModal} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
             >
                🔧 Login Admin
             </button>
          )}
          
        </div>
      </div>
    </nav>
  );
};


// --- App Component ---
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate(); // Hook ini memerlukan pembungkus <Router> di parent (main.jsx)

  const handleSuccessfulLogin = () => {
    setShowLogin(false);
    navigate('/admin'); // Redirect ke halaman admin setelah berhasil login
  };

  return (
    <>
      <Navigation openLoginModal={() => setShowLogin(true)} />
      
      <Routes>
        {/* Slide 1 */}
        <Route path="/" element={<HomePage />} />
        
        {/* Slide 2 */}
        <Route path="/menu" element={<CustomerMenuPage />} />
        
        {/* Slide 3 (Admin) */}
        <Route path="/admin" element={<CakeListPage />} /> 
      </Routes>
      
      {/* Modal Login */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onLogin={handleSuccessfulLogin} 
      />
    </>
  );
}

export default App;