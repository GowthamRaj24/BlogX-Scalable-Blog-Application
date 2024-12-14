import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BackendUrl } from '../../private/backend_url';

const BlogHeader = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                const response = await axios.post(`${BackendUrl}/user/JWTToUser`, {
                    token: token
                });
                setUsername(response.data.user.name || 'User');
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/signin');
    };

    const navigationItems = [
        { name: 'Home', path: '/blogs' },
        { name: 'Post Blog', path: '/blog/create' },
        { name: 'Profile', path: '/profile' },
        { name: 'About', path: '/about' }
    ];

    return (
        <header className="mb-16">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full fixed top-0 left-0 z-10">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl gap-4">
                    {/* Logo Section - Left */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                            <span className="text-3xl">📝</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
                                Blog:X
                            </span>
                        </div>
                    </div>

                    {/* Navigation Links - Center */}
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex flex-grow justify-center order-3 lg:order-2 w-full lg:w-auto`}>
                        <ul className="flex flex-col lg:flex-row lg:space-x-8 font-medium">
                            {navigationItems.map((item) => (
                                <li key={item.path}>
                                    <button 
                                        onClick={() => navigate(item.path)}
                                        className="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 lg:p-0 transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button 
                                    onClick={handleLogout}
                                    className="block py-2 pr-4 pl-3 text-red-600 hover:text-red-700 lg:p-0 transition-colors"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Search and Profile - Right */}
                    <div className="flex items-center gap-4 order-2 lg:order-3">
                        <div className="relative w-64">
                            <input 
                                type="text" 
                                className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search blogs..." 
                            />
                            <svg 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-2">
                            <div 
                                className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors"
                                onClick={() => navigate('/profile')}
                            >
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default BlogHeader;