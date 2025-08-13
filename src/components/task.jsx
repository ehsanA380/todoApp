import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskModal from './modal/taskModal';

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
                        e.classList.add('hover:bg-green-100', 'bg-[rgb(199,211,194)]', 'text-black')
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
        <>
        <div className='bg-[#F1F1F2] absolute bottom-0 top-16 right-0 left-0  '>
            <div className='heading w-full'>
                <div id='navRow' className={`w-fit  pt-[8px] mx-auto   `}>
                    <button className={'btnCustom transition duration-200  border-r-2 rounded-l-xl border-amber-50 px-12 py-2 cursor-pointer bg-green-800  text-white hover:bg-green-700 '}>Today</button>
                    <button className={'btnCustom transition duration-200 border-r-2 border-amber-50 px-12 py-2 cursor-pointer bg-[rgb(199,211,194)] hover:bg-green-100'}>Pending</button>
                    <button className={'btnCustom transition duration-200 rounded-r-xl px-12 py-2 cursor-pointer bg-[rgb(199,211,194)] hover:bg-green-100'}>Overdue</button>
                </div>
            </div>
            <div id='taskContainer' className='mt-20 text-2xl w-full flex justify-between items-center'>
                <div className="ml-20 font-semibold ">
                    <h1 >Task</h1>
                </div>
                <div className="task mr-20">
                    <TaskModal/>
                    <button  className='bg-green-700 text-white text-[16px]  py-1 px-5 rounded-[3px] hover:bg-green-600 cursor-pointer' onClick={()=>document.getElementById('taskModal').show()} >+ Add Task </button>
                </div>
            </div>
            <div id="taskHolderContainer">
                <div id="mainTaskWrapper" className='border-2 border-[#9d9d9dc0] w-[80%] mx-auto min-h-80 rounded-[8px] mt-2 bg-[#fff] shadow-[10px]'>
                    <div id="taskList" className='border-2 border-[#9d9d9dc0]  mx-auto min-h-60 rounded-[1px] mt-6 w-[95%] bg-[#fff] shadow-[10px] py-10'>
                        
                    </div>
                   
                </div>
            </div>

           
        </div>
        </>
    )
}
export default Task
