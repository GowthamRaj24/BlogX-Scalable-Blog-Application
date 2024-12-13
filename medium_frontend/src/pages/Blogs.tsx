import axios from "axios";
import Blog from "../components/Blog/Blog";
import BlogHeader from "../components/BlogHeader/BlogHeader";
import { useEffect, useState } from "react";
import { BackendUrl } from "../private/backend_url";

const Blogs = () => {

    const [Blogs, setBlogs] = useState([])

    useEffect(() => {
        const jwt = window.localStorage.getItem("jwt");
        const fetchData = async () => {
            await axios.get(BackendUrl + "/blog" + "/all", {
                headers: {
                    authorization: jwt
                }
            })
            .then((res) => {

                setBlogs(res.data.blogs)
            })
            .catch((err) => {
                console.warn(err.response.data.error);
            })
        };
        fetchData();
    }, [])

    return(<>
    <BlogHeader/>
    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 mt-4">
          <h2 className="my-5 mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
    </div>
    <span className="block h-0.5 w-20 bg-primary-500 mx-auto mb-10"></span>
    <section className="bg-white dark:bg-gray-900">
        <div className=" mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
                <Blog blog={Blogs[0]}/>
                <Blog  blog={Blogs[0]}/>
            </div>  
        </div>
    </section>

    </>)
}

export default Blogs;