import { useEffect, useState, useContext } from 'react';
import API, { setAuthToken } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import CalendarView from '../components/CalendarView';
import { Player } from '@lottiefiles/react-lottie-player';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [myRSVPs, setMyRSVPs] = useState([]);

  // ✅ Define fetchData BEFORE useEffect
  const fetchData = async () => {
    try {
      const eventRes = await API.get('/events');
      setEvents(eventRes.data);

      const rsvpRes = await Promise.all(
        eventRes.data.map(e => API.get(`/rsvp/${e._id}`).catch(() => []))
      );

      const my = [];
      rsvpRes.forEach((rsvps, i) => {
        rsvps.data?.forEach(r => {
          if (r.user._id === user._id) {
            my.push(eventRes.data[i]);
          }
        });
      });

      setMyRSVPs(my);
    } catch (err) {
      console.error('Error fetching events or RSVPs:', err);
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const myEvents = events.filter(e => e.creator._id === user._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 p-6 transition duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Hi, {user.name} 👋</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Welcome back to your event dashboard
          </p>
        </div>
        <Link
          to="/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition"
        >
          ➕ Create Event
        </Link>
      </div>

      {/* Lottie Animation Section */}
      <div className="flex justify-center items-center mb-4">
        <div className="w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72">
          <Player
            autoplay
            loop
            src="/dashboard-lottie.json"
            style={{ width: '200%', height: '200%' }}
          />
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
          🎯 Events I Created
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myEvents.map(event => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{event.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {new Date(event.startTime).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
          📌 Events I RSVP’d
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myRSVPs.map(event => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{event.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {new Date(event.startTime).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-400 mb-4">
          📅 Upcoming Events Calendar
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <CalendarView />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
