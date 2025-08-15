import React, { useContext, useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/authContext';
function signup() {
    const location = useLocation();
    const { setLogin } = useContext(AuthContext);
    const navigateTo = useNavigate();
    const [spinner, setSpinner] = useState(false);
    const [formData, setFromData] = useState({ fname: '', lname: '', email: '', password: '' });
    const API_URL='https://todoapp-backend-gub9.onrender.com/signup';
    const Local_API='http://localhost:3000/signup';
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        const { name, value } = e.target;
        setFromData(prev => ({ ...prev, [name]: value }));
    };
    //toast
    const notify = () => toast("Wow so easy!");

    //=========
    // handleSubmit
    const handleSubmit = async (e) => {
        setSpinner(true)
        e.preventDefault();
        console.log(formData); // { name: '...', email: '...' }
        // const response = await fetch('http://localhost:3000/signup', {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log('data:', data)
        if (data) {
            // toast(`${data.message}`)
            setTimeout(() => {
                setSpinner(false)
            }, 1000);
            navigateTo('/')
            if (data.insertedId) {
                setLogin(true);
                sessionStorage.setItem('user', formData.email)
                sessionStorage.setItem('login', 'true')
                sessionStorage.setItem('fname', formData.fname)
                sessionStorage.setItem('lname', formData.lname)
                sessionStorage.setItem('token', 'bearer ' + data.token)
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            location.pathname == '/signup' && document.getElementById('signinModal').showModal()
        }, 0)
    }, [])




    return (
        <>



            {/* <!-- Modal --> */}
            <dialog id="signinModal" className='modal'>
                <div className='modal-box'>
                    <form onSubmit={handleSubmit} method="dialog">
                        <Link to={'/'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>document.getElementById('signinModal').close()}>✕</Link>
                        <h2 class="text-xl font-semibold mb-4">Sign Up</h2>

                        {/* <!-- firstname --> */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div class="mb-4">
                                <label for="fname" class="block text-sm font-medium text-white">Frist Name</label>
                                <input type="text" name='fname' id="fname" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.fname} onChange={handleChange} required />
                            </div>
                            {/* <!-- lastname --> */}
                            <div class="mb-4  ">
                                <label for="lname" class="block text-sm font-medium text-white">Last Name</label>
                                <input type="text" name='lname' id="lname" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.lname} onChange={handleChange} required />
                            </div>
                        </div>
                        {/* <!-- Email --> */}
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-white">Email</label>
                            <input type="email" name='email' id="email" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.email} onChange={handleChange} required />
                        </div>

                        {/* <!-- Password --> */}
                        <div class="mb-6">
                            <label for="password" class="block text-sm font-medium text-white">Password</label>
                            <input type="password" name='password' id="password" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.password} onChange={handleChange} required />
                        </div>

                        {/* <!-- Buttons --> */}
                        <div class="flex justify-end space-x-2">
                            <Link to='/' id='cancel' onClick={() => document.getElementById('signinModal').close()} type="button" class="px-4 py-2 bg-gray-900 rounded hover:bg-gray-400">Cancel</Link>
                            {spinner ? 'loading...' : <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Sign In</button>}
                        </div>
                    </form>
                </div>

            </dialog>
            {/* <ToastContainer /> */}

        </>
    )
}

export default signup
