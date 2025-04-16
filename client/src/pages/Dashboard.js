import React from 'react';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Stories</h2>
          {/* Story list will be implemented here */}
          <div className="space-y-4">
            <p className="text-gray-600">No stories yet. Start creating one!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;