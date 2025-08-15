import { useContext, useEffect } from "react";
import { Link,useNavigate ,useLocation} from "react-router-dom";
import AuthContext from "../context/authContext";

function Navbar(){
  const {logout} = useContext(AuthContext)
  const location =useLocation();
  const logoutHandler = ()=>{
      // sessionStorage.removeItem('login');
      // sessionStorage.removeItem('user');
      logout()
      // sessionStorage.clear()
   
  }
  const navigate = useNavigate();
  // useEffect(()=>{
  //   navigate('/')
  
  // },[sessionStorage])
    return(
        <>
           {/* <!-- Include this script tag or install `@tailwindplus/elements` via npm: --> */}
{/* <!-- <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script> --> */}
<nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      
      <div class="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
        
        <div class=" sm:ml-6 sm:block">
          <div class="flex space-x-4">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link to="/"  class={`rounded-md ${location.pathname=='/'? 'bg-gray-900':''} px-3 py-2 text-sm font-medium text-white`}>TodoApp</Link>
            <Link to="/task" className={`rounded-md ${location.pathname=='/task'? 'bg-gray-900':''} px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}>Tasks</Link>
            <a href="#" className={`rounded-md hidden sm:block ${location.pathname=='/project'? 'bg-gray-900':''} px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}>Projects</a>
            <a href="#" className={`rounded-md hidden sm:block ${location.pathname=='/calender'? 'bg-gray-900':''} px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}>Calendar</a>
          </div>
        </div>
      </div>
      <div class="absolute space-x-2 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <span class="absolute -inset-1.5"></span>
          <span class="sr-only">View notifications</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
            <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        {sessionStorage.getItem('login')=='true'?
        <>
        <Link onClick={logoutHandler} id="logout" to="/" type="button" className="btn text-red-500 rounded-md px-3 py-2 text-sm font-medium  hover:bg-gray-700 hover:text-white">Logout</Link>
        <h1 className="text-green-400 ">{sessionStorage.getItem('fname')}</h1>
        </>:<>
        <Link id="login" to="/login" type="button" className="btn  rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">LogIn</Link>
        <Link id="signup" to="/signup" type="button" className="btn  rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">SignUp</Link>
        </>
        }
        

        {/* <!-- Profile dropdown --> */}
        
      </div>
    </div>
  </div>

 
</nav>

        </>
    )
}
export default Navbar;