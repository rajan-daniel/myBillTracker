"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setError("Invalid email or password");
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-88px)] flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h1>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Link (MATCHES SIGNUP STYLE) */}
        <div className="text-sm text-center text-gray-600 pt-2">
          <a href="/signup" className="hover:underline">
            Don't have an account? Create Account
          </a>
        </div>
      </form>
    </main>
  );
}