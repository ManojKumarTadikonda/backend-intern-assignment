import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import type { Task, TaskFormData, TaskStatus } from '../types/task';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<void>;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

export function TaskForm({ onSubmit, editingTask, onCancelEdit }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'Pending',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
      });
    }
  }, [editingTask]);

  const validateForm = (): boolean => {
    const newErrors: { title?: string; status?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (!editingTask) {
        setFormData({
          title: '',
          description: '',
          status: 'Pending',
        });
      }
      setErrors({});
    } catch (error) {
      console.error('Failed to submit task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      status: 'Pending',
    });
    setErrors({});
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-[#1E293B] mb-4">
        {editingTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#0F172A] mb-1"
          >
            Title <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-shadow ${
              errors.title ? 'border-[#DC2626]' : 'border-gray-300'
            }`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-[#DC2626]">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#0F172A] mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-shadow resize-none"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-[#0F172A] mb-1"
          >
            Status <span className="text-[#DC2626]">*</span>
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as TaskStatus })
            }
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-shadow ${
              errors.status ? 'border-[#DC2626]' : 'border-gray-300'
            }`}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-[#DC2626]">{errors.status}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#2563EB] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {editingTask ? (
              <>
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                {isSubmitting ? 'Creating...' : 'Create Task'}
              </>
            )}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 border border-gray-300 text-[#1E293B] rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
