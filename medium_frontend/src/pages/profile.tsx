import React from 'react';
import Blog from '../components/Blog/Blog';
import BlogHeader from '../components/BlogHeader/BlogHeader';

const BlogHeaderProfile = ({ user }: { user: any }) => {
  return (
    <>
    <BlogHeader />
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-2xl p-8 mb-10 mt-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <img 
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 right-0 bg-green-500 p-1.5 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-purple-100 mt-2">{user.email}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-4 py-1 bg-white/20 rounded-full text-sm">Professional Blogger</span>
            <span className="px-4 py-1 bg-white/20 rounded-full text-sm">Tech Enthusiast</span>
          </div>
        </div>
        <div className="flex gap-8 text-center">
          <div className="bg-white/10 px-6 py-3 rounded-lg">
            <p className="text-3xl font-bold">{user.posts?.length || 0}</p>
            <p className="text-purple-100">Posts</p>
          </div>
          <div className="bg-white/10 px-6 py-3 rounded-lg">
            <p className="text-3xl font-bold">1.2K</p>
            <p className="text-purple-100">Likes</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


const dummyUser = {
  id: "1",
  email: "john.doe@example.com",
  name: "John Doe",
  posts: [
    {
      id: "1",
      title: "Getting Started with React",
      content: "React is a powerful library for building user interfaces. In this post, we'll explore the fundamentals of React and how to get started with your first application.",
      published: true,
      authorId: "1"
    },
    {
      id: "2",
      title: "Understanding TypeScript",
      content: "TypeScript adds static typing to JavaScript, making it easier to build and maintain large applications. Let's dive into its key features and benefits.",
      published: true,
      authorId: "1"
    },
    {
      id: "3",
      title: "Mastering Tailwind CSS",
      content: "Tailwind CSS is a utility-first CSS framework that can dramatically speed up your development workflow. Here's how to make the most of it.",
      published: true,
      authorId: "1"
    }
  ]
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BlogHeaderProfile user={dummyUser} />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Latest Posts</h2>
            <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              New Post
            </button>
          </div>
          
          <div className="grid gap-6">
            {dummyUser.posts.map((blog) => (
              <Blog blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
