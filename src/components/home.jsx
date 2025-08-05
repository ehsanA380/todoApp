import React, { useContext } from 'react'
import AuthContext from '../context/authContext'

function Home() {
  const {auth,logout} = useContext(AuthContext)
  // console.log(auth,logout)
  return (
    <>
      {auth.token?<h1>logged in </h1>: <h1>logout</h1>}
      <h1>{auth.user}</h1>
      
    </>
  )
}

export default Home
