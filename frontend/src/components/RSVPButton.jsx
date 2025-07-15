const RSVPButton = ({ currentStatus, onChange }) => {
  const statuses = ['Yes', 'No', 'Maybe'];

  return (
    <div className="space-x-2 mt-2">
      {statuses.map(status => (
        <button
          key={status}
          className={`px-3 py-1 rounded ${currentStatus === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => onChange(status)}>
          {status}
        </button>
      ))}
    </div>
  );
};

export default RSVPButton;