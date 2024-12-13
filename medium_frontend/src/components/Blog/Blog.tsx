import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { BackendUrl } from "../../private/backend_url";
import { useNavigate } from "react-router-dom";

interface BlogProps {
  blog: {
    id: string;
    title: string;
    content: string;
    authorId: string;
    date?: string;
  };
}

const Blog = ({ blog }: BlogProps) => {
    const [username, setUsername] = useState("Loading...");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = async () => {
            if (blog?.authorId) {
                try {
                    const response = await axios.post(`${BackendUrl}/user/idToUser`, { 
                        id: blog.authorId 
                    });
                    setUsername(response.data.user.name);
                } catch (err) {
                    setUsername("Unknown User");
                }
            }
        };

        if (blog) {
            fetchUsername();
        }
    }, [blog]);

    const handleReadMore = () => {
        navigate(`/blog/${blog.id}`);
    };

    return (
        <>
            {blog ? (
                <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-5 text-gray-500">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path>
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                            </svg>
                            Article
                        </span>
                        <span className="text-sm">{blog.date}</span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <button onClick={handleReadMore} className="hover:text-blue-600 transition-colors">
                            {blog.title}
                        </button>
                    </h2>
                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                        {blog.content.slice(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img 
                                className="w-7 h-7 rounded-full" 
                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`} 
                                alt={`${username} avatar`} 
                            />
                            <span className="font-medium dark:text-white">
                                {username}
                            </span>
                        </div>
                        <button 
                            onClick={handleReadMore}
                            className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                        >
                            Read more
                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </article>
            ) : (
                <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-5">
                    <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
                    <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
                </div>
                <div className="animate-pulse bg-gray-200 h-8 w-3/4 rounded mb-4"></div>
                <div className="animate-pulse bg-gray-200 h-20 w-full rounded mb-5"></div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="animate-pulse bg-gray-200 w-7 h-7 rounded-full"></div>
                        <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
                    </div>
                    <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
                </div>
            </article>
            )}
        </>
    );
};

export default Blog;
