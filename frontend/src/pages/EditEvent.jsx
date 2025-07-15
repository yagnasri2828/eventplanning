import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API, { setAuthToken } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    startClock: '',
    endDate: '',
    endClock: '',
    location: '',
    maxCapacity: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        const event = res.data;
        const start = new Date(event.startTime);
        const end = new Date(event.endTime);
        setForm({
          name: event.name,
          description: event.description,
          startDate: start.toISOString().split('T')[0],
          startClock: start.toTimeString().slice(0, 5),
          endDate: end.toISOString().split('T')[0],
          endClock: end.toTimeString().slice(0, 5),
          location: event.location,
          maxCapacity: event.maxCapacity,
          imageUrl: event.imageUrl || ''
        });
      } catch (err) {
        toast.error('Failed to load event data.');
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async () => {
    setAuthToken(token);
    const startTime = new Date(`${form.startDate}T${form.startClock}`);
    const endTime = new Date(`${form.endDate}T${form.endClock}`);

    try {
      await API.put(`/events/${id}`, {
        name: form.name,
        description: form.description,
        startTime,
        endTime,
        location: form.location,
        maxCapacity: Number(form.maxCapacity),
        imageUrl: form.imageUrl
      });
      toast.success('Event updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to update event.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-orange-700 dark:text-orange-400 mb-8">✏️ Edit Event</h2>

        <div className="space-y-4">
          <input
            className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
            placeholder="Event Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            className="w-full p-3 h-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md resize-none"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-1 text-gray-700 dark:text-gray-300">Start Date</label>
              <input
                type="date"
                className="w-full p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm block mb-1 text-gray-700 dark:text-gray-300">Start Time</label>
              <input
                type="time"
                className="w-full p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
                value={form.startClock}
                onChange={(e) => setForm({ ...form, startClock: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-1 text-gray-700 dark:text-gray-300">End Date</label>
              <input
                type="date"
                className="w-full p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm block mb-1 text-gray-700 dark:text-gray-300">End Time</label>
              <input
                type="time"
                className="w-full p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
                value={form.endClock}
                onChange={(e) => setForm({ ...form, endClock: e.target.value })}
              />
            </div>
          </div>

          <input
            className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <input
            type="number"
            className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
            placeholder="Max Capacity"
            value={form.maxCapacity}
            onChange={(e) => setForm({ ...form, maxCapacity: e.target.value })}
          />

          <input
            className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 text-white font-semibold rounded-lg bg-orange-600 hover:bg-orange-700 transition-all duration-300 shadow"
        >
          ✅ Update Event
        </button>
      </div>
    </div>
  );
};

export default EditEvent;
