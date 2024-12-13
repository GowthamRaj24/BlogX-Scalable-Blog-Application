import React, { useEffect, useState } from 'react';
import Blog from '../components/Blog/Blog';
import BlogHeader from '../components/BlogHeader/BlogHeader';
import axios from 'axios';
import { BackendUrl } from '../private/backend_url';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

interface User {
  id: string;
  email: string;
  name: string | null;
}

const BlogPost = ({ blog, onEdit }: { blog: Post; onEdit: (id: string) => void }) => {
  return (
    <div className="relative">
      <Blog blog={blog} />
      <button
        onClick={() => onEdit(blog.id)}
        className="absolute top-4 right-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
      >
        Edit
      </button>
    </div>
  );
};

const BlogHeaderProfile = ({ user, postCount }: { user: User, postCount: number }) => {
  return (
    <>
      <BlogHeader />
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-gray-800 rounded-xl shadow-lg p-8 mb-10 mt-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img 
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name || user.email}`}
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <div className="absolute -bottom-2 right-0 bg-green-500 p-1.5 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900">{user.name || 'Anonymous'}</h1>
            <p className="text-gray-600 mt-2">{user.email}</p>
          </div>

          <div className="flex gap-8 text-center">
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-gray-900">{postCount}</p>
              <p className="text-gray-600">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const userResponse = await axios.post(`${BackendUrl}/user/JWTToUser`, {
          token: token
        });
        setUser(userResponse.data.user);

        const postsResponse = await axios.get(`${BackendUrl}/blog/all`, {
          headers: {
            'authorization': token
          }
        });
        
        const userPosts = postsResponse.data.blogs.filter(
          (post: Post) => post.authorId === userResponse.data.user.id
        );
        setPosts(userPosts);

      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [navigate]);

  const handleNewPost = () => {
    navigate('/blog/create');
  };

  const handleEdit = (blogId: string) => {
    navigate(`/blog/edit/${blogId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BlogHeaderProfile user={user} postCount={posts.length} />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Latest Posts</h2>
            <button 
              onClick={handleNewPost}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              New Post
            </button>
          </div>
          
          <div className="grid gap-6">
            {posts.map((blog) => (
              <BlogPost key={blog.id} blog={blog} onEdit={handleEdit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
