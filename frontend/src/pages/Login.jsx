import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LockClosedIcon, EnvelopeIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Login() {
  const { login, loading, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    setSuccess(ok);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl border dark:border-gray-800 w-full max-w-md space-y-6 animate-in fade-in"
      >
        <div className="flex flex-col items-center gap-1 mb-2">
          <LockClosedIcon className="w-10 h-10 text-indigo-500 dark:text-indigo-300" />
          <h2 className="text-2xl font-extrabold mb-0 text-gray-900 dark:text-gray-50 tracking-tight">
            Sign In
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            Access your ReMedi dashboard
          </div>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium text-center">
            {error}
          </div>
        )}
        <div>
          <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <EnvelopeIcon className="w-5 h-5" />
            </span>
            <input
              type="email"
              className="pl-10 w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="username"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-lg hover:from-indigo-700 hover:to-blue-700 transition-shadow shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {success && (
          <div className="text-green-600 mt-2 text-center font-medium animate-in fade-in">
            Login successful!
          </div>
        )}
        {/* SIGN UP BUTTON */}
        <div className="flex items-center justify-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-200 font-semibold shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            aria-label="Create new account"
          >
            <UserPlusIcon className="w-5 h-5" />
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}