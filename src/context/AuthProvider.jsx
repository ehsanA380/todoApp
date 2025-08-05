import React, { useEffect, useState } from "react";
import AuthContext from "./authContext";

const AuthProvider =({children})=>{
    const [auth,setAuth] = useState({token:null,user:null,data:{}});
    
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
            if(data){
                const user = data.data.fname;
                setAuth({token,user,data});   
            }
        }
        
        if(token){
            verifyToken(token)
        }
           
    },[0]);

    const login = (token,user) =>{
        sessionStorage.setItem('token',token);
        setAuth({token,user})
    }
    const logout = () =>{
        sessionStorage.removeItem('token');
        setAuth({token:null,user:null});
    };

    return(
        <AuthContext.Provider value={{auth,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;