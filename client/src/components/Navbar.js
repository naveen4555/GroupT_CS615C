import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, InformationCircleIcon, QuestionMarkCircleIcon, EnvelopeIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              StoryCollab
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <HomeIcon className="h-5 w-5 mr-1" />
              Home
            </Link>
            <Link to="/about" className="flex items-center text-gray-600 hover:text-gray-900">
              <InformationCircleIcon className="h-5 w-5 mr-1" />
              About
            </Link>
            <Link to="/how-it-works" className="flex items-center text-gray-600 hover:text-gray-900">
              <QuestionMarkCircleIcon className="h-5 w-5 mr-1" />
              How It Works
            </Link>
            <Link to="/stories" className="flex items-center text-gray-600 hover:text-gray-900">
              <BookOpenIcon className="h-5 w-5 mr-1" />
              Stories
            </Link>
            <Link to="/contact" className="flex items-center text-gray-600 hover:text-gray-900">
              <EnvelopeIcon className="h-5 w-5 mr-1" />
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
            )}
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 