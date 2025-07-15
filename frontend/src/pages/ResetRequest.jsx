import { useState } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';

const ResetRequest = () => {
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');

  const handleRequest = async () => {
    try {
      const res = await API.post('/auth/reset-password', { email });
      toast.success('Reset email sent! Please check your inbox.');
      setLink(res.data.resetLink || '');
    } catch (err) {
      console.error('Reset error:', err.response?.data || err.message);
      toast.error('Failed to request reset.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg rounded-lg p-8 w-full max-w-md border border-blue-200 dark:border-blue-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">🔐 Reset Your Password</h2>

        <input
          className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition shadow"
          onClick={handleRequest}
        >
          Request Reset Link
        </button>

        {link && (
          <div className="mt-4 text-sm text-green-700 dark:text-green-400 break-words">
            ✅ Reset Link (testing only): <a href={link} className="underline">{link}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetRequest;
