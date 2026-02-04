import { CheckSquare, LogOut, User } from "lucide-react";

export function Header() {
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#2563EB] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App Title */}
          <div className="flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-white" strokeWidth={2.5} />
            <h1 className="text-2xl font-bold text-white">Task Manager</h1>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {userName && (
              <div className="flex items-center gap-2 bg-blue-600/30 px-3 py-1.5 rounded-full">
                <User className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {userName}
                </span>
              </div>
            )}
            {role === "admin" && (
              <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                Admin
              </span>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white text-sm font-medium hover:bg-blue-600 px-3 py-2 rounded-md transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
