import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';

const ResetForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleReset = async () => {
    try {
      await API.post(`/auth/reset/${token}`, { password });
      toast.success('Password updated! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Reset error:', err.response?.data || err.message);
      toast.error('Reset failed. Link may have expired.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8 w-full max-w-md border border-green-200 dark:border-green-700 relative overflow-hidden">

        {/* ✨ Decorative glow */}
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 blur-xl opacity-20 dark:opacity-25 animate-slow-pulse z-0" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-300 mb-6">
            🔐 Set a New Password
          </h2>

          <input
            className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleReset}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold shadow-md transition"
          >
            🔁 Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetForm;
