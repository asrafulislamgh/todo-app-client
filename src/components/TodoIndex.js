import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Tasks from './Tasks';


export default function TodoIndex() {
  const taskRef = useRef();
  const timeRef = useRef();
  const [allTasks, setAllTasks] = useState([]);
  
  useEffect(()=> {
    fetch("http://localhost:5000/alltasks")
  .then(res => res.json())
  .then(data => setAllTasks(data));
  }, [allTasks])


  // Retriving tasks from DB 
  

  // Inserting task to DB 
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const taskName = taskRef.current.value;
    const time = timeRef.current.value;
    const newTask = {taskName, time};
    fetch("http://localhost:5000/alltasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask)
    })
    .then(res => res.json())
    .then(data =>{
      if(data.insertedId) {
        Swal.fire(
          'Good job!',
          'Your task is inserted successfully!',
          'success'
        )
        event.target.reset()
      }
    })
  }


  return (
    <div className='container bg-white max-w-xl mx-auto p-6 rounded-lg'>
      <div className="text-center">
        <header className="top-section">
          <h1 className='pb-5 text-3xl'>My Todo list</h1>
          <form className="mb-4 flex gap-1" onSubmit={handleSubmit}>
            <input ref={taskRef} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="inputTask" type="text" placeholder="Type your task name" required/>
            <input ref={timeRef} className="shadow appearance-none border  rounded-full w-3/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="inputTime" type="time" placeholder="Time" required/>
            <button onSubmit={handleSubmit} className="w-2/4 rounded-full bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white">Add Task</button>
        </form>
        </header>
        <div>
        <h4 className='text-xl mt-5 mb-3'>All tasks</h4>
            {
              allTasks.map(task => <Tasks key={task._id} taskInfo={task} allTasks = {[allTasks, setAllTasks]}/>)
            }
        </div>
      </div>
    </div>
  )
}
