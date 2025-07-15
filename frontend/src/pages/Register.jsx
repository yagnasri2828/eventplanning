import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', form);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed. Try a different email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-pink-300 dark:border-pink-700">
        {/* ✨ Slow glowing border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-yellow-400 blur-xl rounded-2xl opacity-20 animate-slow-glow z-0"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6">🚀 Create an Account</h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded transition shadow-lg"
            onClick={handleRegister}
          >
            🎉 Register
          </button>

          <hr className="my-5 border-gray-300 dark:border-gray-600" />

          <button
            className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-pink-700 dark:text-pink-300 font-semibold py-2 rounded transition"
            onClick={() => navigate('/login')}
          >
            🔐 Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
