import React from 'react';
import { useNavigate } from 'react-router-dom';
const RestaurantPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/restaurants');
  };
  return (
    <div className="bg-gradient-to-br from-red-800 via-red-600 to-red-400 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-6xl font-extrabold mb-4">Welcome to Restaurant Management</div>
      <p className="text-2xl mb-8">Your Ultimate Solution for Restaurant Operations</p>
      <button
        onClick={handleGetStarted}
        className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105"
      >
        Get Started
      </button>
      <div className="mt-12 text-center">
        <p className="text-lg">Explore our restaurant management features:</p>
        <div className="flex space-x-8 mt-4">
          <div className="p-4 border rounded-lg hover:bg-red-700 hover:border-yellow-400 hover:text-yellow-400 transition duration-300 transform hover:scale-105">
            <i className="fas fa-utensils fa-4x mb-4 text-5xl"></i>
            <p className="text-xl font-semibold">Menu Management</p>
            <p className="mt-2">Effortlessly organize and update your restaurant menu.</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-red-700 hover:border-yellow-400 hover:text-yellow-400 transition duration-300 transform hover:scale-105">
            <i className="fas fa-chart-pie fa-4x mb-4 text-5xl"></i>
            <p className="text-xl font-semibold">Performance Insights</p>
            <p className="mt-2">Gain valuable insights into your restaurant's performance.</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-red-700 hover:border-yellow-400 hover:text-yellow-400 transition duration-300 transform hover:scale-105">
            <i className="fas fa-calendar-alt fa-4x mb-4 text-5xl"></i>
            <p className="text-xl font-semibold">Reservation System</p>
            <p className="mt-2">Efficiently manage reservations for your restaurant.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantPage;
