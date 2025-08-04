import Navbar from "./components/navbar"
import { Routes, Route } from 'react-router-dom';
import SignUp from "./components/signup";
import Home from "./components/home";
import Login from "./components/login";
import Task from "./components/task";


function App() {

  return (
   <>
     <Navbar/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/signup" element={<SignUp/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/task" element={<Task/>} />
     </Routes>
   </>
  )
}


export default App
