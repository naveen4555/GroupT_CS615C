import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = token ? { 'x-auth-token': token } : {};
        
        const response = await axios.get('http://localhost:5001/api/stories', { headers });
        setStories(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to fetch stories');
        toast.error('Failed to fetch stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Get all unique tags from stories
  const allTags = [...new Set(stories.flatMap(story => story.tags || []))];

  // Filter stories based on search term and selected tags
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.mainText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => story.tags?.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-16 h-16 border-4 border-indigo-600 rounded-full border-t-transparent shadow-lg"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="text-red-500 text-xl bg-white p-8 rounded-lg shadow-lg">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Collaborative Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of storytellers and create amazing stories together
          </p>
          {isLoggedIn && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <Link
                to="/stories/new"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Story
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg transition-all duration-200 shadow-sm hover:shadow-md"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stories Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-medium">
                      {story.author?.name?.[0] || '?'}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{story.author?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(story.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
                    {story.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {story.mainText}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/stories/${story._id}`}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 w-full justify-center"
                  >
                    {isLoggedIn ? 'View & Edit' : 'Read Story'}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filteredStories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm mx-auto max-w-lg"
          >
            <div className="w-24 h-24 mx-auto mb-6 text-indigo-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No stories found</h3>
            <p className="text-gray-600 mb-6 px-6">
              {searchTerm || selectedTags.length > 0
                ? 'Try adjusting your search or filters'
                : 'Be the first to create an amazing story!'}
            </p>
            {isLoggedIn && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/stories/new"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Create Your First Story
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Stories; 