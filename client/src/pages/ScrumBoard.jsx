import React, { useContext, useEffect, useState } from 'react';
import { TaskManagerContext } from '@/context/contextApi';
import { getAllTasksApi, updateTaskApi } from '@/service/api';
import TaskDialogForm from '@/components/commonDailog';
import ScrumColumn from '../components/ScrumColumn';
import { toast } from 'sonner';
import { LayoutDashboard} from 'lucide-react';

const ScrumBoard = () => {
  const { loading, setloading, taskList, setTaskList, user } = useContext(TaskManagerContext);
  const [editTask, setEditTask] = useState(null);
  const [canShow , setCanShow] = useState(false)

  useEffect(() => {
    if (!user?._id) return;
    fetchListOfTasks();
  }, [user]);

  async function fetchListOfTasks() {
    try {
      setloading(true);
      const response = await getAllTasksApi(user?._id);
      if (response?.success) {
        setTaskList(response.data);
      }
    } catch (error) {
      console.log("Error in ScrumBoard:", error);
    } finally {
      setloading(false);
    }
  }

  // Group tasks by status
  const groupedTasks = {
    pending: taskList?.filter(task => task.status === 'pending') || [],
    'in-progress': taskList?.filter(task => task.status === 'in-progress') || [],
    completed: taskList?.filter(task => task.status === 'completed') || []
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const draggedTask = taskList.find(task => task._id === taskId);
    
    if (draggedTask && draggedTask.status !== newStatus) {
      try {
        // Update task status via API
        const response = await updateTaskApi({
          ...draggedTask,
          status: newStatus,
          _id: draggedTask._id,
          userId: user?._id
        });

        if (response?.success) {
          // Update local state
          setTaskList(prevTasks => 
            prevTasks.map(task => 
              task._id === taskId ? { ...task, status: newStatus } : task
            )
          );
          toast.message(`Task moved to ${newStatus.replace('-', ' ')} ✨`);
        } else {
          toast.error("Failed to update task status");
        }
      } catch (error) {
        console.error("Error updating task status:", error);
        toast.error("Error updating task status");
      }
    }
  };

  const handleTaskUpdated = () => {
    setEditTask(null);
    fetchListOfTasks();
  };

  const columns = [
    {
      id: 'pending',
      title: 'Pending',
      status: 'pending',
      color: 'bg-red-50 border-red-200',
      headerColor: 'bg-red-100 text-red-800',
      count: groupedTasks.pending.length
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      status: 'in-progress',
      color: 'bg-yellow-50 border-yellow-200',
      headerColor: 'bg-yellow-100 text-yellow-800',
      count: groupedTasks['in-progress'].length
    },
    {
      id: 'completed',
      title: 'Completed',
      status: 'completed',
      color: 'bg-green-50 border-green-200',
      headerColor: 'bg-green-100 text-green-800',
      count: groupedTasks.completed.length
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Scrum Board</h1>
          </div>
          <TaskDialogForm onTaskAdded={fetchListOfTasks} />
        </div>
        <p className="text-gray-600 mt-2">
          Drag and drop tasks between columns to update their status
        </p>
      </div>

      {/* Scrum Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <ScrumColumn
            key={column.id}
            column={column}
            tasks={groupedTasks[column.status]}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
            onEditTask={setEditTask}
            onTaskUpdated={fetchListOfTasks}
          />
        ))}
      </div>

      {/* Edit Task Dialog */}
      {editTask && (
        <TaskDialogForm
          editTask={editTask}
          canShow={canShow}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default ScrumBoard;
