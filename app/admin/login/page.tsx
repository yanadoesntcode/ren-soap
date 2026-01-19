"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F9FAFB] to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1F2937] mb-2">人 REN</h1>
          <p className="text-[#4B5563]">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1F2937] mb-2">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#C084FC] focus:ring-4 focus:ring-[#C084FC]/20 transition-all"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-[#C084FC] to-[#A855F7] text-white font-bold py-3 px-6 rounded-lg hover:from-[#A855F7] hover:to-[#C084FC] transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Access Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}
