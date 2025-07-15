import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  // Apply or remove dark class from root <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex justify-between items-center transition duration-300">
      <Link to="/" className="text-xl font-bold text-purple-700 dark:text-white">
        🎯 Event Planner
      </Link>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="text-sm bg-gray-200 dark:bg-gray-800 dark:text-white text-black px-3 py-1 rounded shadow transition hover:scale-105"
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Profile Avatar */}
        {user && (
          <div
            className="relative cursor-pointer"
            onClick={() => navigate('/profile')}
            title="Go to profile"
          >
            <img
              src={
                user.profileImage?.trim()
                  ? user.profileImage
                  : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
              }
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 hover:scale-105 transition"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
