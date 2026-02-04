import api from "./api";
import type { Task, TaskFormData } from "../types/task";

export const taskService = {
  async getAllTasks(params?: {
    search?: string;
    status?: string;
    page?: number;
  }): Promise<{ tasks: Task[]; pages: number }> {
    const res = await api.get("/tasks", { params });
    return res.data;
  },

  async getAllTasksAdmin(params?: {
    search?: string;
    status?: string;
    page?: number;
  }): Promise<{ tasks: Task[]; pages: number }> {
    const res = await api.get("/tasks/admin/all", { params });
    return res.data;
  },

  async createTask(taskData: TaskFormData): Promise<Task> {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  async updateTask(_id: string, taskData: TaskFormData): Promise<Task> {
    const response = await api.put(`/tasks/${_id}`, taskData);
    return response.data;
  },

  async deleteTask(_id: string): Promise<void> {
    await api.delete(`/tasks/${_id}`);
  },
};
