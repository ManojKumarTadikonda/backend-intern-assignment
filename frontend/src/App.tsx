import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { taskService } from "./services/taskService";
import type { Task, TaskFormData } from "./types/task";
import { SignupCard } from "./components/SignupCard";
import { LoginCard } from "./components/LoginCard";
import { AdminRegisterForm } from "./components/AdminRegisterForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  const role = localStorage.getItem("role");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated, search, statusFilter, page]);

  // ---------------- TASK API ----------------
  const loadTasks = async () => {
    try {
      setIsLoading(true);

      let res;

      if (role === "admin") {
        // 👑 Admin → fetch all tasks
        res = await taskService.getAllTasksAdmin({
          search,
          status: statusFilter,
          page,
        });
      } else {
        // 👤 User → fetch own tasks
        res = await taskService.getAllTasks({
          search,
          status: statusFilter,
          page,
        });
      }

      setTasks(res.tasks);
      setPages(res.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData: TaskFormData) => {
    const newTask = await taskService.createTask(taskData);
    setTasks([newTask, ...tasks]);
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!editingTask) return;
    const updated = await taskService.updateTask(editingTask._id, taskData);
    setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = async (id: string) => {
    await taskService.deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
    if (editingTask?._id === id) {
      setEditingTask(null);
    }
  };

  // ---------------- AUTH UI ----------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        {showSignup ? (
          <SignupCard
            onSwitchToLogin={(message) => {
              setShowSignup(false);
              if (message) setLoginSuccessMessage(message);
            }}
          />
        ) : (
          <LoginCard
            successMessage={loginSuccessMessage}
            onAuthSuccess={() => {
              setLoginSuccessMessage("");
              setIsAuthenticated(true);
            }}
            onSwitchToSignup={() => {
              setLoginSuccessMessage("");
              setShowSignup(true);
            }}
          />
        )}
      </div>
    );
  }

  // ---------------- TASK APP ----------------
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {role === "admin" ? (
              <AdminRegisterForm />
            ) : (
              <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                editingTask={editingTask}
                onCancelEdit={handleCancelEdit}
              />
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="border rounded px-3 py-2 w-full sm:w-1/2"
              />

              <select
                value={statusFilter}
                onChange={(e) => {
                  setPage(1);
                  setStatusFilter(e.target.value);
                }}
                className="border rounded px-3 py-2 w-full sm:w-1/4"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              isLoading={isLoading}
              role={role}
            />
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {page} of {pages}
              </span>

              <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
