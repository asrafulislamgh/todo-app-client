import React, { useState } from 'react';
import {FaEdit, FaTrash  } from 'react-icons/fa';
import { MdOutlineDoneOutline  } from 'react-icons/md';
import { AiOutlineClockCircle  } from 'react-icons/ai';

const Tasks = ({taskInfo, allTasks}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  // handling update 
  // const renderUpdateForm = (id) => {
  //   // <form className=''>
  //   //   <input type="text" name="update" id="" placeholder='Text' />
  //   //   <button type='submit' className='w-2/4 rounded-full bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white'>Update</button>
  //   // </form>
  //   <p>Test is going on</p>
  // }
  const updateForm = () => {
    setIsUpdating(false)
  }

  // handling delete 
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to delete the task?");
    if(proceed) {
      fetch(`http://localhost:5000/alltasks/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0) {
        alert("Deleted successfully!")
        const remainingTasks = allTasks[0].filter(singleTask => id !== singleTask._id);
        console.log(remainingTasks)
        console.log(allTasks)
        allTasks[1](remainingTasks)
      }
    })
    }
  }
  const {_id, taskName, time} = taskInfo;
    const text= "I have a lot of thing to do today. But I haven not enough time."
    return (


      <div className="bg-gray-50 p-3 rounded-full drop-shadow-lg mb-4">
          {
            isUpdating ?
            <div>
              <form onSubmit={updateForm} className='flex justify-between gap-2'>
                  <div className='flex justify-between gap-2'>
                      <input className='shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="update" id="" placeholder='Text' value={taskName}/>
                      <input className="shadow appearance-none border text-sm rounded-full w-3/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="inputTime" type="time" placeholder="Time" value={time} required/>
                  </div>
                  <button type='submit' className='rounded-full bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white'>Update</button>
              </form>
            </div>
            :
            <div className='flex justify-between'>
                <div>
                  <p className='text-left px-2 text-gray-400'><AiOutlineClockCircle className='inline'/> {time}</p>
                  <p className='text-left px-2'>{taskName?.length > 55 ? text.substring(0,55)+ "..." : taskName}</p>
                </div>
                <div className="flex gap-5">
                  <button onClick={()=> setIsUpdating(true)} className='text-gray-400 hover:text-gray-700' title='Edit'  type="button"><FaEdit/></button>
                  <button onClick={()=> handleDelete(_id)} className='text-gray-400 hover:text-gray-700' title='Delete'  type="button"><FaTrash /></button>
                  <button className='text-gray-400 hover:text-gray-700' title='Finish'  type="button"><MdOutlineDoneOutline/></button>
                </div>
            </div>
          }
      </div>
      
    );
}

export default Tasks;


        
