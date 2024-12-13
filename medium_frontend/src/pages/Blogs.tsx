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

const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const blogsPerPage = 6;

    useEffect(() => {
        fetchBlogs();
    }, [currentPage]);

    const fetchBlogs = async () => {
        const jwt = localStorage.getItem("jwt");
        try {
            const response = await axios.get(`${BackendUrl}/blog/all`, {
                headers: {
                    authorization: jwt
                }
            });
            setBlogs(response.data.blogs);
            setLoading(false);
        } catch (error) {
            console.warn("Error fetching blogs:", error);
            setLoading(false);
        }
    };

    // Get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <BlogHeader/>
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 mt-10">
                <h2 className="my-5 mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Our Blog
                </h2>
                <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    We use an agile approach to test assumptions and connect with the needs of your audience early and often.
                </p>
            </div>
            <span className="block h-0.5 w-20 bg-primary-500 mx-auto mb-5"></span>

            <section className="bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-8 lg:grid-cols-2">
                                {currentBlogs.map((blog) => (
                                    <Blog key={blog.id} blog={blog} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center space-x-2 mt-8">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg ${
                                        currentPage === 1 
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`px-4 py-2 rounded-lg ${
                                            currentPage === i + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg ${
                                        currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Blogs;
