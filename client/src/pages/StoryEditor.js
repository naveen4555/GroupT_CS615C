import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const StoryEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedSnapshots, setEditedSnapshots] = useState([]);
  const [newSnapshot, setNewSnapshot] = useState({ 
    text: '', 
    links: [],
    pictures: []
  });
  const [newLink, setNewLink] = useState({ url: '', description: '' });
  const [newPicture, setNewPicture] = useState({ url: '', caption: '' });
  const [uploadingPicture, setUploadingPicture] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please log in to edit the story');
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:5001/api/stories/${id}`, {
          headers: {
            'x-auth-token': token
          }
        });

        setStory(response.data);
        setEditedContent(response.data.mainText);
        setEditedSnapshots(response.data.snapshots || []);
        setIsEditing(response.data.isBeingEdited);
      } catch (error) {
        console.error('Error fetching story:', error);
        if (error.response?.status === 401) {
          toast.error('Please log in to edit the story');
          navigate('/login');
        } else {
          setError('Failed to fetch story');
          toast.error('Failed to fetch story');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, navigate]);

  const handleStartEditing = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to edit the story');
        navigate('/login');
        return;
      }

      const response = await axios.put(
        `http://localhost:5001/api/stories/${id}/start-editing`,
        {},
        {
          headers: {
            'x-auth-token': token
          }
        }
      );

      if (response.data.success) {
        setIsEditing(true);
        toast.success('You can now edit the story');
      }
    } catch (error) {
      console.error('Error starting edit:', error);
      if (error.response?.status === 401) {
        toast.error('Please log in to edit the story');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to start editing');
      }
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to edit the story');
        navigate('/login');
        return;
      }

      const response = await axios.put(
        `http://localhost:5001/api/stories/${id}`,
        {
          title: story.title,
          mainText: editedContent,
          tags: story.tags,
          snapshots: editedSnapshots
        },
        {
          headers: {
            'x-auth-token': token
          }
        }
      );

      if (response.data) {
        setStory(response.data);
        setIsEditing(false);
        toast.success('Story updated successfully');
      }
    } catch (error) {
      console.error('Error saving story:', error);
      if (error.response?.status === 401) {
        toast.error('Please log in to edit the story');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to save story');
      }
    }
  };

  const handleCancel = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to edit the story');
        navigate('/login');
        return;
      }

      const response = await axios.put(
        `http://localhost:5001/api/stories/${id}/stop-editing`,
        {},
        {
          headers: {
            'x-auth-token': token
          }
        }
      );

      if (response.data.success) {
        setIsEditing(false);
        setEditedContent(story.mainText);
        setEditedSnapshots(story.snapshots || []);
        toast.success('Editing cancelled');
      }
    } catch (error) {
      console.error('Error cancelling edit:', error);
      if (error.response?.status === 401) {
        toast.error('Please log in to edit the story');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to cancel editing');
      }
    }
  };

  const handleAddSnapshot = () => {
    if (newSnapshot.text.trim()) {
      setEditedSnapshots([
        ...editedSnapshots,
        {
          ...newSnapshot,
          order: editedSnapshots.length + 1
        }
      ]);
      setNewSnapshot({ text: '', links: [], pictures: [] });
    }
  };

  const handleRemoveSnapshot = (index) => {
    setEditedSnapshots(editedSnapshots.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
    if (newLink.url.trim()) {
      setNewSnapshot({
        ...newSnapshot,
        links: [...newSnapshot.links, newLink]
      });
      setNewLink({ url: '', description: '' });
    }
  };

  const handleRemoveLink = (index) => {
    setNewSnapshot({
      ...newSnapshot,
      links: newSnapshot.links.filter((_, i) => i !== index)
    });
  };

  const handleAddPicture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPicture(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      });

      if (response.data.url) {
        setNewSnapshot({
          ...newSnapshot,
          pictures: [...newSnapshot.pictures, {
            url: response.data.url,
            caption: newPicture.caption || file.name
          }]
        });
        setNewPicture({ url: '', caption: '' });
        toast.success('Picture uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading picture:', error);
      toast.error('Failed to upload picture');
    } finally {
      setUploadingPicture(false);
    }
  };

  const handleRemovePicture = (index) => {
    setNewSnapshot({
      ...newSnapshot,
      pictures: newSnapshot.pictures.filter((_, i) => i !== index)
    });
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

  if (!story) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="text-gray-500 text-xl bg-white p-8 rounded-lg shadow-lg">
          Story not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  {story.title}
                </h1>
                <div className="flex flex-wrap gap-2 mt-3">
                  {story.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartEditing}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Start Editing
                </motion.button>
              ) : (
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>
            
            <div className="prose max-w-none">
              {isEditing ? (
                <div className="space-y-8">
                  <div className="relative">
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Edit the story content..."
                    />
                    <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                      {editedContent.length} characters
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      Snapshots
                    </h3>
                    <AnimatePresence>
                      {editedSnapshots.map((snapshot, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="border-2 border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-gray-700 flex-grow">{snapshot.text}</p>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemoveSnapshot(index)}
                              className="ml-4 p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-all duration-200"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>

                          {/* Display Pictures */}
                          {snapshot.pictures && snapshot.pictures.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Pictures</h4>
                              <div className="grid grid-cols-2 gap-4">
                                {snapshot.pictures.map((picture, pictureIndex) => (
                                  <div key={pictureIndex} className="relative rounded-lg overflow-hidden group">
                                    <img
                                      src={picture.url}
                                      alt={picture.caption}
                                      className="w-full h-40 object-cover rounded-lg"
                                    />
                                    {picture.caption && (
                                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                        {picture.caption}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Display Links */}
                          {snapshot.links && snapshot.links.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Links</h4>
                              <div className="space-y-2">
                                {snapshot.links.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                                  >
                                    {link.description || link.url}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Add New Snapshot */}
                    <div className="border-2 border-gray-100 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Add New Snapshot</h4>
                      <textarea
                        value={newSnapshot.text}
                        onChange={(e) => setNewSnapshot({ ...newSnapshot, text: e.target.value })}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Write your snapshot here..."
                      />

                      {/* Pictures Section */}
                      <div className="mt-6">
                        <h5 className="text-lg font-medium text-gray-900 mb-4">Pictures</h5>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {newSnapshot.pictures.map((picture, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden group">
                              <img
                                src={picture.url}
                                alt={picture.caption}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRemovePicture(index)}
                                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                                >
                                  ×
                                </motion.button>
                              </div>
                              {picture.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                  {picture.caption}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={newPicture.caption}
                            onChange={(e) => setNewPicture({ ...newPicture, caption: e.target.value })}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            placeholder="Picture caption (optional)"
                          />
                          <div className="flex items-center space-x-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAddPicture}
                              disabled={uploadingPicture}
                              className="flex-1 p-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            />
                            {uploadingPicture && (
                              <div className="text-sm text-indigo-600">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-current rounded-full border-t-transparent"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Links Section */}
                      <div className="mt-6">
                        <h5 className="text-lg font-medium text-gray-900 mb-4">Links</h5>
                        <div className="space-y-4">
                          {newSnapshot.links.map((link, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                              >
                                {link.description || link.url}
                              </a>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemoveLink(index)}
                                className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-all duration-200"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </motion.button>
                            </div>
                          ))}
                          <div className="flex space-x-4">
                            <input
                              type="text"
                              value={newLink.url}
                              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                              placeholder="Link URL"
                            />
                            <input
                              type="text"
                              value={newLink.description}
                              onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                              placeholder="Link description (optional)"
                            />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleAddLink}
                              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              Add Link
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddSnapshot}
                        className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Add Snapshot
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed">{story.mainText}</p>
                  </div>
                  
                  {story.snapshots && story.snapshots.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        Story Snapshots
                      </h3>
                      {story.snapshots
                        .sort((a, b) => a.order - b.order)
                        .map((snapshot, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border-2 border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-200"
                          >
                            <p className="text-gray-700 mb-4">{snapshot.text}</p>

                            {/* Display Pictures */}
                            {snapshot.pictures && snapshot.pictures.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Pictures</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  {snapshot.pictures.map((picture, pictureIndex) => (
                                    <div key={pictureIndex} className="relative rounded-lg overflow-hidden">
                                      <img
                                        src={picture.url}
                                        alt={picture.caption}
                                        className="w-full h-40 object-cover rounded-lg"
                                      />
                                      {picture.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                          {picture.caption}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Display Links */}
                            {snapshot.links && snapshot.links.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Links</h4>
                                <div className="space-y-2">
                                  {snapshot.links.map((link, linkIndex) => (
                                    <a
                                      key={linkIndex}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                                    >
                                      {link.description || link.url}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryEditor; 