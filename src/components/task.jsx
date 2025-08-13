import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Task() {
    const [formData, setFromData] = useState({ title: '', description: '' });
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    {
        (() => {
            const btns = document.querySelectorAll('.btnCustom');
            // console.log(btns)
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // console.log('hi');
                    btns.forEach((e) => {
                        e.classList.remove('bg-green-800', 'text-white', 'hover:bg-green-700')
                        e.classList.add('hover:bg-green-100', 'bg-[rgb(199,211,194)]', 'text-black-800')
                    }
                    );
                    btn.classList.add('bg-green-800', 'hover:bg-green-700', 'text-white')
                })
            });
        })()
    }
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
        <div className='bg-red-200 h-auto   '>
            <div className='heading w-full'>
                <div id='navRow' className={`w-fit  pt-[8px] mx-auto   `}>
                    <button className={'btnCustom transition duration-200  border-r-2 rounded-l-xl border-amber-50 px-12 py-2 cursor-pointer bg-green-800  text-white hover:bg-green-700 '}>Today</button>
                    <button className={'btnCustom transition duration-200 border-r-2 border-amber-50 px-12 py-2 cursor-pointer bg-[rgb(199,211,194)] hover:bg-green-100'}>Pending</button>
                    <button className={'btnCustom transition duration-200 rounded-r-xl px-12 py-2 cursor-pointer bg-[rgb(199,211,194)] hover:bg-green-100'}>OverDueS</button>
                </div>
            </div>
            <div id='taskContainer' className='font-semibold mt-30 text-2xl w-full flex justify-between'>
                <div className="ml-20">
                    <h1 >Task</h1>
                </div>
                <div className="task mr-20">
                    <h1>Add Task</h1>
                </div>
            </div>
            <div id="taskHolderContainer">
                {/* work here */}
            </div>

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
        </div>
    )
}
export default Task
