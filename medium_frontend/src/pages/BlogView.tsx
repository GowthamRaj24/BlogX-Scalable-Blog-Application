import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BackendUrl } from '../private/backend_url';
import BlogHeader from '../components/BlogHeader/BlogHeader';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  date?: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<string>('');
  const { scrollY } = useScroll();
  
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/blog/api/v1/viewblog/${id}`, {
          headers: {
            'authorization': localStorage.getItem('jwt')
          }
        });
        setBlog(response.data.blogs);
        
        if (response.data.blogs?.authorId) {
          const authorResponse = await axios.post(`${BackendUrl}/user/idToUser`, {
            id: response.data.blogs.authorId
          });
          setAuthor(authorResponse.data.user.name);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    
    fetchBlog();
  }, [id]);



  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      
      <motion.div 
        style={{ y: headerY }}
        className="relative h-[60vh] overflow-hidden"
      >
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
        />
        
        <div className="absolute inset-0 bg-black/30" />
        
        <motion.div 
          style={{ y: headerY }}
          className="absolute inset-0 flex items-center justify-center text-white"
        >
          <div className="text-center space-y-4 px-4">
            <h1 className="text-5xl md:text-7xl font-bold">{blog.title}</h1>
            <p className="text-xl md:text-2xl">By {author}</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
          <div className="flex items-center space-x-4 mb-8">
            <img 
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${author}`}
              alt={author}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900">{author}</p>
              <p className="text-gray-500 text-sm">{blog.date || 'Published recently'}</p>
            </div>
          </div>

          <div className="prose prose-lg prose-blue">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Share this article</h3>
          <div className="flex justify-center space-x-4">
            {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
              <button
                key={platform}
                className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {platform}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
