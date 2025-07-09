import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserPlusIcon, EnvelopeIcon, LockClosedIcon, IdentificationIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

// Canonical backend roles
const ROLES = [
  { value: "", label: "Select Role" },
  { value: "HOSPITAL", label: "Hospital" },
  { value: "PHARMACY", label: "Pharmacy" },
  { value: "NGO", label: "NGO / Non-profit" },
  { value: "CLINIC", label: "Clinic" },
];

export default function Register() {
  const { register, loading, error } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(await register(form));
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl border dark:border-gray-800 w-full max-w-md space-y-6 animate-in fade-in" autoComplete="off">
        <div className="flex flex-col items-center gap-1 mb-2">
          <UserPlusIcon className="w-10 h-10 text-green-500 dark:text-green-300" />
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">Create Account</h2>
          <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">Join ReMedi as a verified healthcare partner</div>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
            Registration successful! You can now log in.
          </div>
        )}
        <div>
          <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">Username</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <IdentificationIcon className="w-5 h-5" />
            </span>
            <input
              type="text"
              name="username"
              className="pl-10 w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={form.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={150}
              autoComplete="username"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <EnvelopeIcon className="w-5 h-5" />
            </span>
            <input
              type="email"
              name="email"
              className="pl-10 w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <LockClosedIcon className="w-5 h-5" />
            </span>
            <input
              type="password"
              name="password"
              className="pl-10 w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={form.first_name}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">Last Name</label>
          <input
            type="text"
            name="last_name"
            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={form.last_name}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">Role</label>
          <select
            name="role"
            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={form.role}
            onChange={handleChange}
            required
          >
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-shadow shadow focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-center mt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-3 py-1 text-sm text-green-700 dark:text-green-300 font-semibold rounded hover:bg-green-50 dark:hover:bg-green-800/20 transition"
          >
            <ArrowLeftOnRectangleIcon className="w-4 h-4" /> Log In
          </Link>
        </div>
      </form>
    </div>
  );
}