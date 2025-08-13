import React, { useEffect, useState } from "react";
import AuthContext from "./authContext";

const AuthProvider =({children})=>{
    const [auth,setAuth] = useState({token:null,user:null,data:{}});
    const [login,setLogin]= useState(false);
    const [loading,setLoading] =useState(true);
    
    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        const verifyToken = async (token)=>{
             // optionally verify token with backend
            const res = await fetch('http://localhost:3000/verifyjwt',{
                method:'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type' : 'application/json',
                }
            });
            const data = await res.json();
            console.log(data);
            if(data.status){
                setLogin(true);
                setLoading(false);
                const user = data.data.fname;
                setAuth({token,user,data});   
            }
        }
        if(token){
            verifyToken(token)
        }else{
            setLoading(false);
        }
        
           
    },[login]);

    // const login = (token,user) =>{
    //     sessionStorage.setItem('token',token);
    //     sessionStorage.setItem('userData',auth.data)
    //     setAuth({token,user})
    // }
    const logout = () =>{
        // sessionStorage.removeItem('token');
        setLogin(false)
        sessionStorage.clear();
        localStorage.setItem('login',false)
        setAuth({token:null,user:null});
    };

    return(
        <AuthContext.Provider value={{auth,logout,setLogin,login,loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;