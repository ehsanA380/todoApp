import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskModal from './modal/taskModal';
import TaskCard from './card/taskCard';

function Task() {
    const [formData, setFromData] = useState({ title: '', description: '' });
    const [spinner, setSpinner] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [taskDisplay, SetTaskDisplay] = useState("today");
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
    // const api_url = `http://localhost:3000/tasks/${sessionStorage.getItem('userId')}`;
    const api_url = `https://todoapp-backend-gub9.onrender.com/tasks/${sessionStorage.getItem('userId')}`;
    // list of task though api
    const getTaskDetails = async () => {
        setSpinner(true);
        try {
            const response = await fetch(api_url, {
                method: 'GET',
                headers: {
                    authorization: sessionStorage.getItem('token')
                }
            });
            const result = await response.json();
            if (result) {
                setTasks(result.result);
                setSpinner(false);
                // console.log(tasks[0])
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSpinner(false);

        }
    }
    //sort task for today,pending,and overdue-----------------
    const todayTask = [];
    const pendingTask = [];
    const overdueTask = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    tasks.map((task)=>{
        const deadline = new Date(task.deadline);
        deadline.setHours(0, 0, 0, 0); // Normalize too
        if(today.getTime()>deadline.getTime()){
            overdueTask.push(task);
        }else if(today.getTime()<deadline.getTime()){
            pendingTask.push(task);
        }else{
            todayTask.push(task);
        }
    })
    //--------------------------------------
    


    useEffect(() => {
        console.log(tasks);
    }, [tasks])
    useEffect(() => {
        getTaskDetails();
    }, [fetching])

    return (
        <>
            <div className='bg-[#F1F1F2] absolute bottom-0 h-fit min-h-screen top-16 right-0 left-0  '>
                <div className='heading w-full '>
                    <div id='navRow' className={`w-fit  pt-[8px] mx-auto   `}>
                        <button id='today' onClick={() => SetTaskDisplay('today')} className={`btnCustom transition duration-200  border-r-2 rounded-l-xl border-amber-50 px-10 py-2 cursor-pointer bg-green-800  text-white hover:bg-green-700 `}>Today</button>
                        <button id='pending' onClick={() => SetTaskDisplay('pending')} className={`btnCustom transition duration-200 border-r-2 border-amber-50 px-11 py-2 cursor-pointer bg-[rgb(199,211,194)] hover:bg-green-100`}>Pending</button>
                        <button id='overdue' onClick={() => SetTaskDisplay('overdue')} className={`btnCustom transition duration-200 rounded-r-xl px-10 py-2 cursor-pointer bg-[rgb(199,211,194)] hover:bg-green-100`}>Overdue</button>
                    </div>
                </div>
                <div id='taskContainer' className='mt-20 text-2xl w-full flex justify-between items-center'>
                    <div className="ml-20 text-black font-semibold ">
                        <h1 >Task</h1>
                    </div>
                    <div className="task mr-20">
                        <TaskModal setFetching={setFetching} />
                        <button className='bg-green-700 text-white text-[16px]  py-1 px-5 rounded-[3px] hover:bg-green-600 cursor-pointer' onClick={() => document.getElementById('taskModal').show()} >+ Add Task </button>
                    </div>
                </div>
                <div id="taskHolderContainer " className='h-fit'>
                    <div id="mainTaskWrapper" className='relative mb-5 text-black border-2 border-[#9d9d9dc0] w-[80%] mx-auto min-h-80 rounded-[8px] mt-2  bg-[#fff] shadow-[10px]'>
                        <div className='absolute flex right-0 gap-1 space-x-2  mr-10 mt-2.5'>
                            <p className='mr-5'>Priority:</p>
                            <span className='bg-[#FA8072] px-3 rounded '>High</span>
                            <span className='bg-[#FFFFE0] rounded'>Medium</span>
                            <span className='bg-[#90EE90] px-4 rounded'>Low</span>
                        </div>
                        <div id="taskList" className='  border-2 border-[#9d9d9dc0]  mx-auto min-h-60 rounded-[1px] mb-10 mt-10 w-[95%] bg-[#fff] shadow-[10px] py-10'>
                            {/* <TaskCard/> */}
                            {/* {tasks?
                            (<h1>{tasks[0].title}</h1>):
                            <h1>tested</h1>
                            } */}
                            {/* to diaplay today tasks */}
                            {(todayTask?.length > 0 && taskDisplay === 'today') ? (
                                todayTask.map((task, index) => (
                                    <TaskCard key={index} task={task} />
                                ))
                            ) : (taskDisplay=='today'&&
                                <h1 className="text-center text-gray-500">No tasks found</h1>
                            )}
                            
                            {/* to diaplay pending tasks */}
                            {  (pendingTask?.length > 0 && taskDisplay === 'pending') ? (
                                pendingTask.map((task, index) => (
                                    <TaskCard key={index} task={task} />
                                ))
                            ) : (taskDisplay=='pending' &&
                                <h1 className="text-center text-gray-500">No tasks found</h1>
                            )}
                            {/* to diaplay overdue tasks */}
                            {(overdueTask?.length > 0 && taskDisplay === 'overdue') ? (
                                overdueTask.map((task, index) => (
                                    <TaskCard key={index} task={task} />
                                ))
                            ) : (taskDisplay=='overdue'&&
                                <h1 className="text-center text-gray-500">No tasks found</h1>
                            )}



                        </div>

                    </div>
                </div>


            </div>
        </>
    )
}
export default Task
