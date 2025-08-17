import badgeColors from '@material-tailwind/react/theme/components/badge/badgeColors';
import React, { useEffect, useState } from 'react'
import TaskModal from '../modal/taskModal';

function TaskCard({ task }) {
    // for dynamic bg colour of cards according to priority
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'salmon';
            case 'medium': return 'lightyellow';
            case 'low': return 'lightgreen';
            default: return 'cyan';
        }
    };

    return (
        <>
            <div id='cardBox' style={{backgroundColor:getPriorityColor(task.priority)}} className=' bg-cyan-200 card  w-[80%] mx-auto shadow-sm relative mb-3'>
                <div className='absolute right-2 top-1'>{task.deadline}</div>
                <div className='absolute right-5 top-[50%] transform translate-y-[-50%] space-x-5  ' >
                <TaskModal task={task} heading={'Update Task'} />
                <button onClick={()=>document.getElementById('taskModal').show() }  className='border-2 hover:bg-blue-600 cursor-pointer rounded '><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"></path><path d="m15 5 3 3"></path></svg></button>
                <button  className='cursor-pointer  hover:bg-red-500 rounded border-2 '><svg  xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path  d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
                </div>
                <input type="checkbox" className='checkbox checkbox-primary mx-5 absolute top-[50%] transform translate-y-[-50%] left-0' />
                <div className="card-body ">
                    <div className='mr-5 pl-10'>
                        <h2 className="card-title">{task.title}</h2>
                        <p>{task.comment}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TaskCard
