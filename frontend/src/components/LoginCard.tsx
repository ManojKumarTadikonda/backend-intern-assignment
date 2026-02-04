import { useState } from "react";
import { authService } from "../services/authService";

interface Props {
  onAuthSuccess: () => void;
  onSwitchToSignup: () => void;
  successMessage?: string;
}


export function LoginCard({ onAuthSuccess, onSwitchToSignup, successMessage }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await authService.login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      onAuthSuccess();
    } catch {
      setError("Invalid email or password");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {successMessage && (
  <p className="text-green-600 text-sm mb-3">{successMessage}</p>
)}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <button className="w-full bg-[#2563EB] text-white py-2 rounded">
          {isLoading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <button onClick={onSwitchToSignup} className="text-[#2563EB] underline">
          Sign up
        </button>
      </p>
    </div>
  );
}
