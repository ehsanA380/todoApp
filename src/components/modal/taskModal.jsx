import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

function TaskModal({setFetching}) {
  const [formData, setFormData] = useState({title:'',priority:'',deadline:'',comment:''});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name,value} = e.target;
    console.log(name,value);
    setFormData(prev=>({...prev,[name]:value}))
    // console.log(formData)
  }
  // handleSubmit
  const handleSubmit = async() =>{
    setFetching(true)
    console.log(formData)
    const API_URL =`https://todoapp-backend-gub9.onrender.com/addtask/${sessionStorage.getItem('userId')}`
    try{
      const response = await fetch(API_URL,{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization':sessionStorage.getItem('token')
            },
            body: JSON.stringify(formData),
      })
      const result = await response.json();
      if(result){
        console.log(result);
        setFetching(false)
        setFormData({title:'',priority:'',deadline:'',comment:''})
      }
    }catch(err){
      console.log(err)
    }
  }
  //handleClose
  const handleClose = ()=>{
    setFormData({title:'',priority:'',deadline:'',comment:''})
    document.getElementById('taskModal').close();
  }
  return (
    <>
      {/* <button className="btn" onClick={()=>document.getElementById('taskModal').showModal()}>open modal</button> */}
      <dialog id="taskModal" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</Link>
          <h1 className="font-bolder ">Task Details</h1>
          <div className=''>
            {/* <!-- title --> */}
            <div class="mb-4">
              <label htmlFor="title" class="block text-sm font-medium text-gray-300">Title</label>
              <input type="text" placeholder='add a task title' name='title' id="title" class="text-sm mt-1 text-gray-300 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.title} onChange={handleChange} required />
            </div>

            {/* <!-- priority and deadline --> */}
            <div className='grid grid-cols-2 gap-4'>
              <div class="mb-6">
                <label htmlFor="priority" class="block text-sm font-medium text-gray-300">Priority</label>
                <select name='priority' id="priority" class="text-sm mt-1 block w-full px-4 py-2 border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.priority} onChange={handleChange} required >
                  <option hidden value='' className='bg-gray-500'>Select Priority</option>
                  <option value="high" className='bg-gray-500'>Hign</option>
                  <option value="medium" className='bg-gray-500'>Medium</option>
                  <option value="low" className='bg-gray-500'>Low</option>
                </select>
              </div>
              <div class="mb-6">
                <label htmlFor="deadline" class="block text-sm font-medium text-gray-700">Deadline</label>
                <input type="date" name='deadline' title='select date' id="deadline" class="text-sm mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={formData.deadline} onChange={handleChange} required />
              </div>
            </div>
            {/* <!-- comment --> */}
            <div class="mb-4">
              <label htmlFor="comment" class="block text-sm font-medium text-gray-100">Title</label>
              <textarea type="text" name='comment' id="comment" class="text-sm mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"onChange={handleChange}  value={formData.comment} placeholder='add any commnet to your task' required />
            </div>
            {/* buttons : close and update task */}
            <div className='mb-4 flex justify-end '>
              <Link onClick={handleClose} className='btn bg-red-500 hover:bg-red-400 '>close</Link>
              <button type='submit' className='btn ml-2 bg-green-500 hover:bg-green-400'>update task</button>
            </div>


          </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default TaskModal
