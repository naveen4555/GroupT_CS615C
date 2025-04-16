import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

// Set the base URL for the API
axios.defaults.baseURL = 'http://localhost:5001';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validation
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      const endpoint = isLogin ? '/api/admin/login' : '/api/admin/register';
      console.log('Sending request to:', endpoint);
      
      const requestBody = {
        email: formData.email,
        password: formData.password,
        ...((!isLogin && formData.username) && { username: formData.username })
      };
      console.log('Request body:', { ...requestBody, password: '***' });

      const response = await axios({
        method: 'POST',
        url: endpoint,
        data: requestBody,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError(response.data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || 'Authentication failed. Please check your credentials.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Admin Login' : 'Admin Registration'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an admin account? " : 'Already have an account? '}
            <button
              onClick={toggleMode}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required={!isLogin}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required={!isLogin}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLogin ? (
                  <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                ) : (
                  <UserPlusIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                )}
              </span>
              {isLoading ? 'Processing...' : (isLogin ? 'Sign in' : 'Register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 