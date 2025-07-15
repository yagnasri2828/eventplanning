import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Home from './pages/Home';
import EditEvent from './pages/EditEvent';
import Navbar from './components/Navbar';
import ResetRequest from './pages/ResetRequest';
import ResetForm from './pages/ResetForm';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

// 🔐 Private Route Wrapper
const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Router>
          {/* Navbar stays at top */}
          <Navbar />

          {/* ✅ Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
                fontSize: '0.9rem',
                borderRadius: '8px',
              },
            }}
          />

          {/* Main content will stretch and push footer down if needed */}
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetRequest />} />
              <Route path="/reset/:token" element={<ResetForm />} />

              {/* Private Routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/create" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
              <Route path="/event/:id" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
              <Route path="/edit/:id" element={<PrivateRoute><EditEvent /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </main>

          {/* ✅ Sticky Footer */}
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
