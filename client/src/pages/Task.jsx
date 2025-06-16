import React, { useContext, useEffect } from 'react'
import TaskDialogForm from '@/components/commonDailog'
import { TaskManagerContext } from '@/context/contextApi'
import { getAllTasksApi } from '@/service/api'

const Task = () => {
  const {loading , setloading , taskList , setTaskList ,user} = useContext(TaskManagerContext)


  useEffect(() => {
  if (!user?._id) return;
  console.log("🔎 User value:", user);
  fetchListOfTasks();
}, [user]);

  async function fetchListOfTasks(){
    try {
      setloading(true);
      const response = await getAllTasksApi(user?._id);
      if(response?.success){
        setTaskList(response.data);
      }
    } catch (error) {
      console.log("error in TASK.JSX" , error)
      
    }
    finally{
      setloading(false);
    }

  }
  console.log(taskList)
  return (
    <>
    <div>
      <TaskDialogForm/>
      
    </div>
   
    
    </>
  )
}

export default Task
