import { Edit2, Trash2, Calendar } from 'lucide-react';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (_id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#16A34A] text-white';
      case 'In Progress':
        return 'bg-[#2563EB] text-white';
      case 'Pending':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-5 border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2 leading-tight">
            {task.title}
          </h3>
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1"
            aria-label="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-1"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
        <Calendar className="w-3.5 h-3.5" />
        <span>Created {formatDate(task.createdAt)}</span>
      </div>
    </div>
  );
}
