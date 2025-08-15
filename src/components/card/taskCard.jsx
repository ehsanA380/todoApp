import badgeColors from '@material-tailwind/react/theme/components/badge/badgeColors';
import React, { useEffect, useState } from 'react'

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
