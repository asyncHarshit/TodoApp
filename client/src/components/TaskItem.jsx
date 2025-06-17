import React, { useState } from 'react'
import CommonCard from './CommonCard'
import { Button } from './ui/button'
import TaskDialogForm from './commonDailog' // CHANGE: Import TaskDialogForm for edit functionality

const TaskItem = ({ item, handleDelete, onTaskUpdated }) => {
  // CHANGE: Add state to manage edit mode
  const [editTask, setEditTask] = useState(null);

  // CHANGE: Handle edit button click
  const handleEdit = () => {
    setEditTask(item); // Set the current task for editing
  };

  // CHANGE: Handle after task update
  const handleTaskUpdated = () => {
    setEditTask(null); // Close edit dialog
    if (onTaskUpdated) {
      onTaskUpdated(); // Refresh parent task list
    }
  };

  return (
    <>
      <CommonCard
        title={item.title}
        description={item.description}
        footerContent={
          <div className="flex w-full justify-end items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(item?._id)}>
              Delete
            </Button>
          </div>
        }
      />
      
      {/* CHANGE: Add TaskDialogForm for editing */}
      {editTask && (
        <TaskDialogForm
          editTask={editTask}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </>
  )
}

export default TaskItem
