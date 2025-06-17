import React, { useContext, useEffect, useState } from 'react';
import TaskDialogForm from '@/components/commonDailog';
import { TaskManagerContext } from '@/context/contextApi';
import { deleteTaskApi, getAllTasksApi } from '@/service/api';
import TaskItem from '@/components/TaskItem';
import ScrumBoard from '../pages/ScrumBoard';
import { LayoutGrid, Kanban } from 'lucide-react';

const Task = () => {
  const { loading, setloading, taskList, setTaskList, user } = useContext(TaskManagerContext);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'board'

  useEffect(() => {
    if (!user?._id) return;
    console.log("🔎 User value:");
    fetchListOfTasks();
  }, [user]);

  async function handleDelete(getTaskId) {
    const response = await deleteTaskApi(getTaskId);
    if (response?.success) {
      fetchListOfTasks();
    }
  }

  async function fetchListOfTasks() {
    try {
      setloading(true);
      const response = await getAllTasksApi(user?._id);
      if (response?.success) {
        setTaskList(response.data);
      }
    } catch (error) {
      console.log("error in TASK.JSX", error);
    } finally {
      setloading(false);
    }
  }

  // If board view is selected, render ScrumBoard
  if (viewMode === 'board') {
    return <>
    <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid View
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'board'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Kanban className="h-4 w-4" />
              Board View
            </button>
          </div>
          
        
        <TaskDialogForm canShow={true} onTaskAdded={fetchListOfTasks} />
        
       </div>
       <div>
        <ScrumBoard/>
       </div>
       </>
  }

  // Otherwise render grid view
  return (
    <>
      <div>
        {/* View Toggle */}
       
         <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 cursor-pointer py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm cursor-pointer'
                  : 'text-gray-600 hover:text-gray-900 cursor-pointer'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid View
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-2 px-3 cursor-pointer py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'board'
                  ? 'bg-white text-gray-900 shadow-sm cursor-pointer'
                  : 'text-gray-600 hover:text-gray-900 cursor-pointer'
              }`}
            >
              <Kanban className="h-4 w-4" />
              Board View
            </button>
          </div>
          
        
        <TaskDialogForm onTaskAdded={fetchListOfTasks} canShow={true}/>
       </div>

        {/* Grid View */}
        <div className='mt-10 flex flex-col'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {taskList?.length > 0
              ? taskList.map((taskItem) => (
                  <TaskItem
                    handleDelete={handleDelete}
                    onTaskUpdated={fetchListOfTasks}
                    key={taskItem._id || taskItem.id}
                    item={taskItem}
                  />
                ))
              : <h1>No task Added</h1>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;