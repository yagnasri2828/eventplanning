import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
    fetchEvents();
  }, []);

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const getMonthEvents = () => {
    return events.filter(event => {
      const start = new Date(event.startTime);
      const end = new Date(event.endTime);
      const inMonth =
        (start.getMonth() === currentMonth.getMonth() && start.getFullYear() === currentMonth.getFullYear()) ||
        (end.getMonth() === currentMonth.getMonth() && end.getFullYear() === currentMonth.getFullYear());

      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase());

      return inMonth && matchesSearch;
    });
  };

  const getCalendarDays = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= endOfMonth.getDate(); d++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    }

    return days;
  };

  const renderEvents = (date) => {
    return getMonthEvents()
      .filter(event => {
        const start = new Date(event.startTime);
        const end = new Date(event.endTime);
        return date.toDateString() >= start.toDateString() && date.toDateString() <= end.toDateString();
      })
      .filter(event => {
        const start = new Date(event.startTime);
        return date.toDateString() === start.toDateString();
      })
      .map(event => (
        <div
          key={event._id}
          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded px-2 py-1 mb-1 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700 truncate"
          onClick={() => navigate(`/event/${event._id}`)}
          title={event.name}
        >
          {event.name}
        </div>
      ));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  const calendarDays = getCalendarDays();
  const today = new Date();

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded shadow-lg max-w-6xl mx-auto transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-lg bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">⬅️</button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{monthName} {year}</h2>
        <button onClick={nextMonth} className="text-lg bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">➡️</button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search events by name or description"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold text-gray-600 dark:text-gray-300">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-2 relative">
        {calendarDays.map((date, index) => {
          if (!date) return <div key={index} className="p-3 h-24 bg-transparent"></div>;

          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          return (
            <div
              key={index}
              className={`relative border p-2 min-h-[6rem] rounded flex flex-col bg-gray-50 dark:bg-gray-800 transition ${
                isToday ? 'border-2 border-blue-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">{date.getDate()}</div>
              <div className="flex flex-col space-y-1 overflow-hidden">
                {renderEvents(date)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
