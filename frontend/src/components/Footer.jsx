const Footer = () => {
  return (
    <footer className="w-full text-center py-6 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} <span className="font-semibold text-purple-700 dark:text-purple-400">Event Planner</span>. 
        Built by <span className="text-indigo-600 dark:text-indigo-400">KURAKULA YAGNA SRI</span>
      </p>
    </footer>
  );
};

export default Footer;
