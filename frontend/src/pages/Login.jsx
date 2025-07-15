import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { setAuthToken } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      setAuthToken(res.data.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Login failed. Check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-purple-300 dark:border-purple-700">
        
        {/* ✨ Slower glowing background */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-blue-400 blur-xl rounded-2xl opacity-20 animate-slow-glow z-0"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-purple-700 dark:text-purple-400 mb-6">✨ Welcome Back</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition shadow-lg"
            onClick={handleLogin}
          >
            🔐 Login
          </button>

          <p
            onClick={() => navigate('/reset-password')}
            className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-3 hover:underline hover:text-indigo-800 dark:hover:text-indigo-300 transition duration-150 cursor-pointer text-right"
          >
            Forgot your password?
          </p>

          <hr className="my-5 border-gray-300 dark:border-gray-600" />

          <button
            className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-purple-700 dark:text-purple-300 font-semibold py-2 rounded transition"
            onClick={() => navigate('/register')}
          >
            ➕ Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
