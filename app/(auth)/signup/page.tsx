"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const supabase = createClient();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validate that passwords match before sending to server
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // optional: redirect after signup
      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="signup-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Create Account</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="text-bold">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="links">
          <a href="/login">Already have an account? Sign In</a>
        </div>
      </form>
    </main>
  );
}
