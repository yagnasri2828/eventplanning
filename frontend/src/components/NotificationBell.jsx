const NotificationBell = ({ count }) => {
  return (
    <div className="relative inline-block">
      <span className="text-2xl">🔔</span>
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs text-white bg-red-600 rounded-full text-center">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
