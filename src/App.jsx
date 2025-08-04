import Navbar from "./components/navbar"
import { Routes, Route } from 'react-router-dom';
import SignUp from "./components/signup";
import Home from "./components/home";
import Login from "./components/login";


function App() {

  return (
   <>
     <Navbar/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/signup" element={<SignUp/>} />
       <Route path="/login" element={<Login/>} />
     </Routes>
   </>
  )
}


export default App
