import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Task() {
    const [formData, setFromData] = useState({ title: '', description: '' });
    const [spinner,setSpinner] = useState(false);


    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        const { name, value } = e.target;
        setFromData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        // setSpinner(true)
        e.preventDefault();
        console.log(formData); // { name: '...', email: '...' }
        
    };
    return (
        <>
            <h1 className='text-2xl font-semibold mt-5 my-auto text-center underline underline-offset-5 '>Add Task</h1>
            <div id='formContainer flex item-center '>
                <form onSubmit={handleSubmit} method="dialog" class=" bg-white p-6 h-auto w-96 rounded-xl shadow-lg  ">
                    <h2 class="text-xl font-semibold mb-4">Log In</h2>


                    {/* <!-- Email --> */}
                    <div class="mb-4">
                        <label htmlFor="email" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="email" name='email' id="email" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.title} onChange={handleChange} required />
                    </div>

                    {/* <!-- Password --> */}
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-gray-700">Description</label>
                        <input type="password" name='password' id="password" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.description} onChange={handleChange} required />
                    </div>

                    {/* <!-- Buttons --> */}
                    <div class="flex justify-end space-x-2">
                        <Link to='/' id='cancel' type="button" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</Link>
                        {spinner ? 'loading...' : <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add</button>}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Task
