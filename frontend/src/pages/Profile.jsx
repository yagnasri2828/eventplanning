import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API, { setAuthToken } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [preview, setPreview] = useState(user.profileImage || '');
  const [imageFile, setImageFile] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [rsvpEvents, setRsvpEvents] = useState([]);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    const res = await API.get('/events');
    const created = res.data.filter(e => e.creator._id === user._id);
    setMyEvents(created);

    const rsvpResponses = await Promise.all(
      res.data.map(e => API.get(`/rsvp/${e._id}`).catch(() => []))
    );

    const rsvped = [];
    rsvpResponses.forEach((r, i) => {
      r.data?.forEach(resp => {
        if (resp.user._id === user._id) {
          rsvped.push(res.data[i]);
        }
      });
    });

    setRsvpEvents(rsvped);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      let imageData = preview;
      if (imageFile) {
        imageData = await toBase64(imageFile);
      }

      const res = await API.put('/user/update', {
        name: form.name,
        email: form.email,
        profileImage: imageData
      });

      setUser(res.data);
      toast.success('Profile updated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400">👤 My Profile</h2>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-3">
            <img
              src={
                preview ||
                (user.profileImage?.trim()
                  ? user.profileImage
                  : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg')
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-center" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            className="border p-3 rounded w-full bg-white dark:bg-gray-800 dark:text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
          />
          <input
            type="email"
            className="border p-3 rounded w-full bg-white dark:bg-gray-800 dark:text-white"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded w-full mb-8 transition"
        >
          💾 Save Changes
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">📅 Events I Created ({myEvents.length})</h3>
            <ul className="space-y-2">
              {myEvents.map(e => (
                <li key={e._id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                  <Link to={`/event/${e._id}`} className="text-blue-700 dark:text-blue-300 hover:underline">{e.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">✅ RSVP’d Events ({rsvpEvents.length})</h3>
            <ul className="space-y-2">
              {rsvpEvents.map(e => (
                <li key={e._id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                  <Link to={`/event/${e._id}`} className="text-blue-700 dark:text-blue-300 hover:underline">{e.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
