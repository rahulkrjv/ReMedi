import React, { useEffect, useState, useContext } from "react";
import { getRequests, createRequest } from "../api/requests";
import { AuthContext } from "../context/AuthContext";

const Requests = () => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    medication: "",
    quantity: 1,
    notes: "",
  });

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getRequests(token)
      .then(setRequests)
      .catch(() => setError("Failed to load requests"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const newReq = await createRequest(form, token);
      setRequests([newReq, ...requests]);
      setForm({ medication: "", quantity: 1, notes: "" });
    } catch {
      setError("Failed to create request");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl border dark:border-gray-800">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-50 tracking-tight">
          Requests
        </h2>
        <form onSubmit={handleSubmit} className="mb-6 grid gap-3">
          <input
            type="text"
            name="medication"
            placeholder="Medication ID"
            value={form.medication}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            required
          />
          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            required
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-700 hover:to-blue-700 text-white font-semibold text-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          >
            Create Request
          </button>
        </form>
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium text-center mb-4">
            {error}
          </div>
        )}
        {loading ? (
          <div className="w-full flex justify-center py-5">
            <span className="animate-pulse text-gray-400 dark:text-gray-600 italic">Loading...</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col gap-2 items-center justify-center py-8 text-gray-500 dark:text-gray-400">
            <span className="text-3xl">🗂️</span>
            <span>No requests yet. Create one above!</span>
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li key={req.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow flex flex-col gap-1">
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="font-bold text-sky-700 dark:text-sky-300">{req.medication}</span>
                  <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-sky-900 text-blue-700 dark:text-sky-300 text-xs">{req.status}</span>
                  <span className="text-xs text-gray-500">Qty: {req.quantity}</span>
                  <span className="ml-auto text-xs text-gray-400">{new Date(req.created_at).toLocaleString()}</span>
                </div>
                {req.notes && (
                  <div className="text-xs italic text-gray-600 dark:text-gray-400 pl-2">"{req.notes}"</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;