import React, { useContext, useState, useEffect } from 'react';
import { X, Plus, Save, Edit } from 'lucide-react';
import { addNewTaskApi, updateTaskApi } from '@/service/api'; // CHANGE: Added updateTaskApi import
import { toast } from 'sonner';
import { TaskManagerContext } from '@/context/contextApi';

// CHANGE: Added editTask and onTaskUpdated props
const TaskDialogForm = ({ onTaskAdded, editTask = null, onTaskUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useContext(TaskManagerContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  
  // CHANGE: Determine if we're in edit mode
  const isEditMode = !!editTask;

  // CHANGE: Effect to populate form when editing
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || '',
        description: editTask.description || '',
        status: editTask.status || 'pending',
        priority: editTask.priority || 'medium'
      });
      setIsOpen(true); // Open dialog when edit task is provided
    }
  }, [editTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 50) {
      newErrors.title = 'Title must be 50 characters or less';
    }
    
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        let response;
        
        // CHANGE: Handle both create and update operations
        if (isEditMode) {
          // Update existing task
          response = await updateTaskApi({
            ...formData,
            _id: editTask._id, // CRITICAL: Include the task ID
            userId: user?._id   // Include userId for backend validation
          });
          
          if (response?.success) {
            toast.message("Task Updated Successfully! ✨");
            if (onTaskUpdated) {
              onTaskUpdated(); // Refresh the task list
            }
          } else {
            toast.error("Failed to update task");
          }
        } else {
          // Create new task
          response = await addNewTaskApi({
            ...formData,
            userId: user?._id
          });
          
          if (response?.success) {
            toast.message("Task Added Successfully! ❤️");
            if (onTaskAdded) {
              onTaskAdded(); // Refresh the task list
            }
          } else {
            toast.error("Failed to create task");
          }
        }
        
        // Reset form and close dialog
        handleClose();
        
      } catch (error) {
        console.error("Error submitting task:", error);
        toast.error("An error occurred while saving the task");
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrors({});
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium'
    });
  };

  return (
    <div>
      {/* CHANGE: Only show trigger button when not in edit mode */}
      {!isEditMode && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Create New Task
        </button>
      )}

      {/* Dialog Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Dialog Content */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              {/* CHANGE: Dynamic title based on edit mode */}
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditMode ? 'Update Task' : 'Create New Task'}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter task title"
                  maxLength={50}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/50 characters
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter task description (optional)"
                  maxLength={500}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/500 characters
                </div>
              </div>

              {/* Status Field */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Priority Field */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {/* CHANGE: Dynamic icon and text based on edit mode */}
                  {isEditMode ? <Edit size={16} /> : <Save size={16} />}
                  {isEditMode ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDialogForm;