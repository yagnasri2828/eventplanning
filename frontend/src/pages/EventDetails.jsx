import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import API, { setAuthToken } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import QuerySection from '../components/QuerySection';

const EventDetails = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchEvent();
    }
  }, [id, token]);

  const fetchEvent = async () => {
    try {
      const e = await API.get(`/events/${id}`);
      const r = await API.get(`/rsvp/${id}`);
      setEvent(e.data);
      setRsvps(r.data);

      const me = r.data.find(r => r.user._id === user._id);
      if (me) setStatus(me.status);
    } catch (err) {
      toast.error('Failed to load event details.');
    }
  };

  const handleRSVP = async (s) => {
    try {
      await API.post(`/rsvp/${id}`, { status: s });
      setStatus(s);
      fetchEvent();
      toast.success(`RSVP updated to "${s}"`);
    } catch (err) {
      toast.error('Failed to update RSVP.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/events/${id}`);
      toast.success('Event deleted successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error("Failed to delete the event.");
    }
  };

  const handleCopyLink = () => {
    const inviteUrl = `${window.location.origin}/event/${id}`;
    navigator.clipboard.writeText(inviteUrl);
    toast.success('Event link copied to clipboard!');
  };

  const statusIcons = {
    Yes: '✅',
    No: '❌',
    Maybe: '❓'
  };

  if (!event) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-md space-y-6">

        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-64 object-cover rounded shadow-sm"
          />
        )}

        <h1 className="text-3xl font-bold">{event.name}</h1>
        <p>{event.description}</p>
        <p><strong>🕒 Time:</strong> {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
        <p><strong>📍 Location:</strong> {event.location}</p>
        <p><strong>👤 Organizer:</strong> {event.creator.name}</p>

        {/* 🔧 Organizer Options */}
        {event.creator._id === user._id && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/edit/${event._id}`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              🗑 Delete
            </button>
          </div>
        )}

        {/* 📝 RSVP Actions */}
        <div>
          <p className="font-semibold mb-2">RSVP:</p>
          {['Yes', 'No', 'Maybe'].map(opt => (
            <button
              key={opt}
              onClick={() => handleRSVP(opt)}
              className={`mr-2 mb-2 px-4 py-1 rounded-full text-sm transition ${
                status === opt
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 hover:bg-orange-100 dark:bg-gray-700 dark:hover:bg-gray-600'
              }`}
            >
              {statusIcons[opt]} {opt}
            </button>
          ))}

          <button
            onClick={handleCopyLink}
            className="ml-2 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            🔗 Copy Invite Link
          </button>
        </div>

        {/* 👥 Attendees */}
        {event.creator._id === user._id && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Attendees ({rsvps.length})</h2>
            <ul className="space-y-1 list-disc pl-5">
              {rsvps.map(r => (
                <li key={r._id}>
                  {r.user.name} - <span className="italic text-gray-600 dark:text-gray-300">{statusIcons[r.status]} {r.status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 💬 Queries */}
        <QuerySection eventId={event._id} eventCreator={event.creator._id} />
      </div>
    </div>
  );
};

export default EventDetails;
