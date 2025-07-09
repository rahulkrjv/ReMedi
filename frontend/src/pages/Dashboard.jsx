import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  ArrowPathIcon,
  BarsArrowDownIcon,
  DocumentArrowUpIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
// Lightweight Skeleton fallback for Dashboard animate-pulse needs.
function Skeleton({ className = "" }) {
  return (
    <div className={"animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800 " + className} />
  );
}

const CARD_PRESENTATION = [
  {
    key: "medications",
    label: "Medications",
    icon: BarsArrowDownIcon,
    colorClasses: "text-green-500 bg-green-100 dark:bg-green-900/60",
  },
  {
    key: "requests",
    label: "Requests",
    icon: ArrowPathIcon,
    colorClasses: "text-blue-500 bg-blue-100 dark:bg-blue-900/60",
  },
  {
    key: "pending",
    label: "Pending Licenses",
    icon: DocumentArrowUpIcon,
    colorClasses: "text-orange-500 bg-orange-100 dark:bg-orange-900/60",
  },
  {
    key: "partners",
    label: "Active Partners",
    icon: UserGroupIcon,
    colorClasses: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/60",
  },
];

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  // Simulate API summary stats and activity (replace with real API calls)
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setLoading(true);
    // TODO: Replace with a single dashboard summary endpoint call
    setTimeout(() => {
      setStats({
        medications: 0, // Replace with: ...fetch summary from API
        requests: 0,
        pending: 0,
        partners: 0,
      });
      setActivities([]); // Replace with: ...fetch org/activity logs
      setLoading(false);
    }, 900);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <div className="text-lg text-gray-700 dark:text-gray-200">Not logged in.</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors py-10">
      <div className="w-full max-w-6xl p-8 bg-white dark:bg-gray-900/90 border dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col gap-8 animate-in fade-in">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-y-2 gap-x-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 tracking-tight">
              Welcome, {user.first_name || user.email} <span aria-label="wave" role="img">👋</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Here’s your compliance and inventory overview.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800/70 text-indigo-700 dark:text-indigo-200 rounded-full text-xs font-medium ring-1 ring-indigo-300 dark:ring-indigo-700 shadow">
              {user.role}
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-xs ring-1 ring-gray-300 dark:ring-gray-700 shadow">
              Member since {new Date(user.date_joined).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {CARD_PRESENTATION.map((card) => (
            <div
              key={card.key}
              className={`col-span-1 flex flex-col items-start gap-2 p-6 shadow-lg rounded-xl transition-colors border border-transparent dark:border-gray-800 bg-white dark:bg-gray-950 ${card.colorClasses}`}
              tabIndex={0}
              aria-label={card.label}
            >
              <div className="flex items-center gap-3">
                <span className={`rounded-full p-2 ${card.colorClasses}`}>
                  <card.icon className="w-6 h-6" />
                </span>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {card.label}
                </span>
              </div>
              <div className="flex items-end gap-4 mt-2">
                {loading ? (
                  <Skeleton className="w-16 h-8" />
                ) : (
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                    {stats?.[card.key]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <ArrowPathIcon className="w-5 h-5 text-indigo-400 dark:text-indigo-500" />
            Recent Activity
          </h3>
          {loading ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {Array.from({ length: 4 }).map((_, i) => (
                <li className="py-3" key={i}>
                  <Skeleton className="h-5 w-full" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {activities && activities.length > 0 ? (
                activities.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-3 group transition-all"
                  >
                    <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      {/* Icons can be matched to activity type */}
                      <BarsArrowDownIcon className="w-5 h-5 text-indigo-400 dark:text-indigo-400" />
                      {item.text}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.time}
                    </span>
                  </li>
                ))
              ) : (
                <li className="flex flex-col items-center py-10 text-gray-400 dark:text-gray-600 gap-2">
                  <DocumentArrowUpIcon className="w-9 h-9 mb-2" />
                  <span>No recent activity yet.</span>
                  <span className="text-xs">
                    You'll see recent licensing, requests, or approvals here.
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}