import React from 'react'
import { useAuth } from '../context/authContext'

function Home() {
  const {user,logout} = useAuth();
  return (
    <>
    <h1>Welcome {user?.name}</h1>
      <button onClick={logout} className='button'>Logout</button>

    </>
  )
}

export default Home
