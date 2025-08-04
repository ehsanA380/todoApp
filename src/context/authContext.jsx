import  {jwtDecode} from "jwt-decode";
import {  createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);

    const login=(token)=>{{
        localStorage.setItem('token',token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log(decoded)
    }}

    const logout = () =>{
        localStorage.removeItem('token');
        setUser(null);
    }

    const isTokenValid = (token) =>{
        try{
            const {ext} = jwtDecode(token);
            return Date.now() < exp*1000;
        }catch(err){
            return false;
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token && isTokenValid(token)){
            const decoded = jwtDecode(token);
            setUser(decoded);
        }else{
            logout();
        }
    },[]);

    return(
        <AuthContext.Provider value={{user,login,logout}}>
        {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);