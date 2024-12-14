import axios from "axios";
import Blog from "../components/Blog/Blog";
import BlogHeader from "../components/BlogHeader/BlogHeader";
import { useEffect, useState } from "react";
import { BackendUrl } from "../private/backend_url";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

interface BlogStats {
    totalBlogs: number;
    totalUsers: number;
  }

const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const blogsPerPage = 6;

    const [stats, setStats] = useState<BlogStats>({ totalBlogs: 0, totalUsers: 0 });

    // Add this to your existing useEffect
    useEffect(() => {
        fetchBlogs();
        fetchStats();
    }, []);

    // Add this new function
    const fetchStats = async () => {
        const jwt = localStorage.getItem("jwt");
        try {
            const response = await axios.get(`${BackendUrl}/blog/api/v1/stats`, {
                headers: {
                    authorization: jwt
                }
            });
            setStats(response.data);
        } catch (error) {
            console.warn("Error fetching stats:", error);
        }
    };


    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        const filtered = blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBlogs(filtered);
        setCurrentPage(1);
    }, [searchQuery, blogs]);

    const fetchBlogs = async () => {
        const jwt = localStorage.getItem("jwt");
        try {
            const response = await axios.get(`${BackendUrl}/blog/all`, {
                headers: {
                    authorization: jwt
                }
            });
            setBlogs(response.data.blogs);
            setFilteredBlogs(response.data.blogs);
            setLoading(false);
        } catch (error) {
            console.warn("Error fetching blogs:", error);
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);


    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <BlogHeader/>
            
            
            {/* Hero Section with Search */}
            <div className="relative overflow-hidden py-16 sm:py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Discover Amazing Stories
            </h1>
            <div className="mt-6 flex justify-center gap-8">
    <div className="text-center">
        <span className="block text-3xl font-bold text-blue-600">
            {filteredBlogs.length}
        </span>
        <span className="text-gray-600 font-medium">
            {stats.totalBlogs === 1  || stats.totalBlogs === 0 ? "Article" : "Articles"} Available
        </span>
    </div>
    <div className="w-px bg-gray-200"></div>
    <div className="text-center">
        <span className="block text-3xl font-bold text-purple-600">
            {stats.totalUsers}
        </span>
        <span className="text-gray-600 font-medium">
            Community Members
        </span>
    </div>
</div>

                       
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Search articles..."
                                    className="pl-12 pr-4 py-3 w-80 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500">
                                    Loading...
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {currentBlogs.map((blog) => (
                                    <Blog key={blog.id} blog={blog} />
                                ))}
                            </div>

                            {/* Enhanced Pagination */}
                            <div className="mt-12 flex justify-center">
                                <div className="inline-flex rounded-lg shadow-sm">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-5 py-2.5 rounded-l-lg border border-r-0 border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        ← Previous
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => paginate(i + 1)}
                                            className={`px-4 py-2 border border-r-0 border-gray-200 text-sm font-medium transition-all duration-200
                                                ${currentPage === i + 1 
                                                    ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
                                                    : 'bg-white hover:bg-gray-50'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-5 py-2.5 rounded-r-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blogs;
