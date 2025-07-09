import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMedications, createMedication, updateMedication } from "../api/medications";
import { CheckCircleIcon, PencilIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Medications() {
  const { access } = useContext(AuthContext);
  const [medications, setMedications] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    expiry: "",
    batch: "",
    storage: "",
    manufacturer: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!access) return;
    setLoading(true);
    getMedications(access)
      .then((data) => {
        setMedications(data);
        setError("");
      })
      .catch(() => setError("Could not load medications."))
      .finally(() => setLoading(false));
  }, [access]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (editId) {
        await updateMedication(editId, form, access);
        setSuccess("Medication updated!");
      } else {
        await createMedication(form, access);
        setSuccess("Medication added!");
      }
      setForm({
        name: "",
        quantity: "",
        expiry: "",
        batch: "",
        storage: "",
        manufacturer: "",
      });
      setEditId(null);
      const data = await getMedications(access);
      setMedications(data);
    } catch {
      setError("Failed to save medication.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (med) => {
    setForm({
      name: med.name,
      quantity: med.quantity,
      expiry: med.expiry,
      batch: med.batch,
      storage: med.storage,
      manufacturer: med.manufacturer,
    });
    setEditId(med.id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="bg-white dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl border dark:border-gray-800 w-full max-w-4xl">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-50 tracking-tight">
          Medications
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium text-center mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 inline" /> {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm font-medium text-center mb-4 flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 inline" /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-6 grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            value={form.quantity}
            onChange={handleChange}
            required
            min={1}
          />
          <input
            type="date"
            name="expiry"
            placeholder="Expiry"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            value={form.expiry}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="batch"
            placeholder="Batch"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            value={form.batch}
            onChange={handleChange}
          />
          <input
            type="text"
            name="storage"
            placeholder="Storage"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            value={form.storage}
            onChange={handleChange}
          />
          <input
            type="text"
            name="manufacturer"
            placeholder="Manufacturer"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            value={form.manufacturer}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="md:col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-700 hover:to-blue-700 text-white py-2 rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            disabled={loading}
          >
            {editId ? (
              <>
                <PencilIcon className="h-5 w-5" /> Update
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-5 w-5" /> Add Medication
              </>
            )}
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-0 text-sm rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Expiry</th>
                <th className="px-3 py-2">Batch</th>
                <th className="px-3 py-2">Storage</th>
                <th className="px-3 py-2">Manufacturer</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8}>
                    <div className="w-full flex justify-center py-5">
                      <span className="animate-pulse text-gray-400 dark:text-gray-600 italic">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : medications.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="w-full flex flex-col gap-3 items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                      <ExclamationTriangleIcon className="h-8 w-8" />
                      <span>No medications found. Add one above!</span>
                    </div>
                  </td>
                </tr>
              ) : (
                medications.map((med) => (
                  <tr key={med.id} className="even:bg-gray-50 dark:even:bg-gray-800 transition-colors">
                    <td className="px-3 py-2">{med.name}</td>
                    <td className="px-3 py-2">{med.quantity}</td>
                    <td className="px-3 py-2">{med.expiry}</td>
                    <td className="px-3 py-2">{med.batch}</td>
                    <td className="px-3 py-2">{med.storage}</td>
                    <td className="px-3 py-2">{med.manufacturer}</td>
                    <td className="px-3 py-2">{med.status}</td>
                    <td className="px-3 py-2">
                      <button
                        className="inline-flex items-center gap-1 text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200 underline text-xs"
                        onClick={() => handleEdit(med)}
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}