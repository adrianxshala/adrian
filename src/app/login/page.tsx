"use client";

import { useState, useContext } from "react";
import { loginUser } from "../lib/api";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Thirr loginUser për të kryer login-in
      const response = await loginUser({ username, password });
      console.log("Login response:", response); // Debugging

      // ✅ Përditëso gjendjen e përdoruesit në AuthContext
      if (authContext) {
        authContext.setUser(response); // Përdor response direkt
        console.log("User set in context:", response); // Debugging
      } else {
        throw new Error("AuthContext is not available");
      }

      // ✅ Ridrejto në /dashboard pas login-it të suksesshëm
      router.push("/");
    } catch (err) {
      console.log("Login error:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}