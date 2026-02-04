import { TaskCard } from './TaskCard';
import type { Task } from '../types/task';
import { ListTodo } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (_id: string) => void;
  isLoading?: boolean;
  role: string | null;
}

export function TaskList({ tasks, onEdit, onDelete, isLoading, role }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mb-4"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <ListTodo className="w-16 h-16 mb-4 text-gray-300" strokeWidth={1.5} />
          <h3 className="text-lg font-medium text-[#1E293B] mb-2">No tasks yet</h3>
          <p className="text-sm text-gray-500">
            Create your first task to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#1E293B]">
          All Tasks ({tasks.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} role={role} />
        ))}
      </div>
    </div>
  );
}
