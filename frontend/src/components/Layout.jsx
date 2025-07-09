import React, { useState, useContext } from "react";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  RectangleGroupIcon,
  DocumentCheckIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  MoonIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: HomeIcon, to: "/dashboard" },
  { name: "Medications", icon: RectangleGroupIcon, to: "/medications" },
  { name: "Requests", icon: ClipboardDocumentListIcon, to: "/requests" },
  { name: "Licenses", icon: DocumentCheckIcon, to: "/licenses" },
  { name: "Organizations", icon: UserCircleIcon, to: "/org-profile" },
  { name: "Audit Log", icon: BookOpenIcon, to: "/auditlog" },
];

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const [dark, setDark] = useState(
    () =>
      localStorage.theme === "dark" ||
      (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const location = useLocation();

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 px-4 py-6 space-y-4 transition-all z-10">
        <div className="font-extrabold text-2xl text-indigo-600 dark:text-indigo-300 mb-6 flex items-center gap-2">
          <RectangleGroupIcon className="w-8 h-8" />
          ReMedi
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-base hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 transition-colors ${
                location.pathname === item.to
                  ? "bg-indigo-200/70 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100"
                  : "text-gray-800 dark:text-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          className="flex items-center gap-2 px-3 py-2 mt-6 bg-red-100 dark:bg-red-950 rounded-lg text-red-700 dark:text-red-300 hover:bg-red-200 hover:dark:bg-red-800 font-medium transition-colors"
          onClick={logout}
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
        {/* Dark Mode Toggle */}
        <button
          className="flex items-center gap-2 px-3 py-2 mt-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium transition-colors"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? (
            <>
              <SunIcon className="w-5 h-5" />
              Light Mode
            </>
          ) : (
            <>
              <MoonIcon className="w-5 h-5" />
              Dark Mode
            </>
          )}
        </button>
        {/* Profile */}
        {user && (
          <div className="mt-auto text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-950 rounded text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <UserCircleIcon className="w-4 h-4" />
            {user.email}
          </div>
        )}
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 bg-white dark:bg-gray-950 px-8 py-4 flex items-center justify-between shadow-sm z-10 border-b border-gray-200 dark:border-gray-800">
          <div className="font-semibold text-lg text-gray-700 dark:text-gray-200">
            {navItems.find((n) => n.to === location.pathname)?.name ?? ""}
          </div>
          <div className="flex items-center gap-4">
            {/* Add additional topbar actions here */}
          </div>
        </header>
        {/* Page Content */}
        <section className="flex-1 p-6 overflow-y-auto">{children}</section>
      </main>
    </div>
  );
}