import React from 'react';
import ScrumTaskCard from './ScrumTaskCard';

const ScrumColumn = ({ column, tasks, onDragOver, onDrop, onEditTask, onTaskUpdated }) => {
  return (
    <div
      className={`${column.color} border-2 border-dashed rounded-lg p-4 min-h-[600px] transition-colors hover:bg-opacity-70`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* Column Header */}
      <div className={`${column.headerColor} rounded-lg p-3 mb-4 flex items-center justify-between`}>
        <h2 className="font-semibold text-lg">{column.title}</h2>
        <span className="bg-white bg-opacity-70 text-sm font-medium px-2 py-1 rounded-full">
          {column.count}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <ScrumTaskCard
              key={task._id}
              task={task}
              onEditTask={onEditTask}
              onTaskUpdated={onTaskUpdated}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📋</div>
            <p>No tasks in {column.title.toLowerCase()}</p>
            <p className="text-sm">Drag tasks here to update status</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrumColumn;