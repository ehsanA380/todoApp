import Navbar from "./components/navbar"
import { Routes, Route } from 'react-router-dom';
import SignUp from "./components/signup";
import Home from "./components/home";


function App() {

  return (
   <>
     <Navbar/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/signup" element={<SignUp/>} />
     </Routes>
   </>
  )
}


export default App
