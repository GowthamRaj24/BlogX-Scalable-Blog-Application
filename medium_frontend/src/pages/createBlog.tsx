import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackendUrl, extentionUrl } from '../private/backend_url';
import { motion } from 'framer-motion';
import BlogHeader from '../components/BlogHeader/BlogHeader';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(BackendUrl + '/blog' + extentionUrl + '/createBlog', 
        { title, content },
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('jwt')
          }
        }
      );

      if (response.status === 200) {
        navigate('/blogs');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <BlogHeader/>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-12"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 backdrop-blur-lg bg-opacity-95"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Create Your Story
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label 
                htmlFor="title" 
                className="block text-lg font-semibold text-gray-700 mb-3"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 text-lg rounded-xl border-2 border-gray-200 
                         focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                         transition-all duration-300 ease-in-out"
                placeholder="Enter an engaging title..."
                required
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label 
                htmlFor="content" 
                className="block text-lg font-semibold text-gray-700 mb-3"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-5 py-4 text-lg rounded-xl border-2 border-gray-200 
                         focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                         transition-all duration-300 ease-in-out resize-none"
                placeholder="Share your thoughts..."
                required
              />
            </motion.div>

            <div className="flex justify-end pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className={`
                  px-8 py-4 rounded-xl text-white font-semibold text-lg
                  shadow-lg transform transition-all duration-300
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'}
                `}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Publishing...</span>
                  </div>
                ) : (
                  'Publish Story'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
    </>
  );
};

export default CreatePost;
