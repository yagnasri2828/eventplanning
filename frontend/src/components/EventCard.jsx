import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
      <p className="text-sm text-gray-600">{new Date(event.startTime).toLocaleString()}</p>
      <p className="text-sm mb-2">{event.location}</p>
      <Link to={`/event/${event._id}`} className="text-blue-500 underline">View Details</Link>
    </div>
  );
};

export default EventCard;