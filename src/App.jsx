import Navbar from "./components/navbar"
import { Routes, Route,useNavigate,useLocation } from 'react-router-dom';
import SignUp from "./components/signup";
import Home from "./components/home";
import Login from "./components/login";
import Task from "./components/task";
import AuthContext from "./context/authContext";
import { useContext, useEffect } from "react";
import ProtectedRoute from "./context/ProtectedRoutes";



function App() {
  const {auth,logout}=useContext(AuthContext);
  // console.log(auth.token!=null)
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  
  useEffect(()=>{
      if(location.pathname=='/task'){
        auth.data.status && navigate('/login');
      }
  },[token])
 
  return (
   <>
     <Navbar/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/signup" element={<SignUp/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/task" element={<ProtectedRoute><Task/></ProtectedRoute>} />:
       
     </Routes>
   </>
  )
}


export default App
