import {BrowserRouter , Routes , Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import Profile from "./pages/profile";
import CreatePost from "./pages/createBlog";
import EditPost from "./pages/modifyBlogs";
import BlogPost from "./pages/BlogView";
import About from "./pages/about";
import ForgotPassword from "./pages/forgotPassword";
import Dashboard from "./pages/dashboard";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/blog/create" element={<CreatePost />} />
        <Route path="/blog/edit/:id" element={<EditPost />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>

    </>
  ) 
}

export default App;