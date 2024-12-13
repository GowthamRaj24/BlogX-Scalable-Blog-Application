import {BrowserRouter , Routes , Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/blog" element={<Blogs/>} />
      </Routes>
    </BrowserRouter>

    </>
  ) 
}

export default App;