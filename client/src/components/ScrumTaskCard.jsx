import React, { useContext } from 'react';
import { TaskManagerContext } from '@/context/contextApi';
import { deleteTaskApi } from '@/service/api';
import { toast } from 'sonner';
import { 
  Calendar, 
  Flag, 
  Edit3, 
  Trash2, 
  GripVertical,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ScrumTaskCard = ({ task, onEditTask, onTaskUpdated }) => {
  const { user } = useContext(TaskManagerContext);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task._id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await deleteTaskApi(task._id);
        if (response?.success) {
          toast.message("Task deleted successfully! 🗑️");
          onTaskUpdated();
        } else {
          toast.error("Failed to delete task");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Error deleting task");
      }
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <Flag className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Flag className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Flag className="h-4 w-4 text-green-500" />;
      default:
        return <Flag className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition-all duration-200 group"
    >
      {/* Drag Handle */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
          {getStatusIcon(task.status)}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEditTask(task)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit task"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Task Meta Information */}
      <div className="flex items-center justify-between">
        {/* Priority Badge */}
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
          {getPriorityIcon(task.priority)}
          <span className="capitalize">{task.priority}</span>
        </div>

        {/* Created Date */}
        {task.createdAt && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(task.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrumTaskCard;