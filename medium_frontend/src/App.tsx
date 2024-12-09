import {BrowserRouter , Routes , Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/blog" element={<Blog/>} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;