import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4 text-center relative overflow-hidden">
      
      <div className="w-64 md:w-80 mb-6">
        <Player
          autoplay
          loop
          src="eventAnimation.json"  // ✅ Accessing from public folder
          style={{ height: '100%', width: '100%' }}
        />
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 dark:text-white drop-shadow-md mb-4">
        🎉 Event Planner
      </h1>

      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl leading-relaxed">
        Seamlessly organize, manage, and RSVP to your favorite events.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          🚪 Login
        </button>

        <button
          onClick={() => navigate('/register')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          📝 Register
        </button>
      </div>

      
    </div>
  );
};

export default Home;
