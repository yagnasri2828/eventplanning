import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { setAuthToken } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CreateEvent = () => {
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

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setAuthToken(token);
    const startTime = new Date(`${form.startDate}T${form.startClock}`);
    const endTime = new Date(`${form.endDate}T${form.endClock}`);

    try {
      await API.post('/events', {
        name: form.name,
        description: form.description,
        startTime,
        endTime,
        location: form.location,
        maxCapacity: Number(form.maxCapacity),
        imageUrl: form.imageUrl
      });
      toast.success('🎉 Event created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('❌ Failed to create event.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center transition-all duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">
          🎯 Create a New Event
        </h2>

        <div className="space-y-4">
          <input
            className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Event Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            className="w-full p-3 h-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Event Description"
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
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow"
        >
          🚀 Submit Event
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
