import React, { use, useContext, useEffect } from 'react'
import AuthContext from '../context/authContext'

function Home() {
  const {auth,logout,login,setLogin} = useContext(AuthContext)
  // console.log(auth,logout)

  return (
    <>
      {login?<h1>loggedin</h1>:<h1>logout</h1>}
      <h1>{auth.user}</h1>
      
    </>
  )
}

export default Home
