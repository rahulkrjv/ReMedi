import React, { useEffect, useState, useContext } from "react";
import { getLicenses, createLicense } from "../api/licenses";
import { AuthContext } from "../context/AuthContext";

const Licenses = () => {
  const { token } = useContext(AuthContext);
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    license_type: "",
    license_number: "",
    issued_date: "",
    expiry_date: "",
    document: null,
    notes: "",
  });

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError("");
    getLicenses(token)
      .then(setLicenses)
      .catch(() => setError("Failed to load licenses"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      const newLic = await createLicense(formData, token);
      setLicenses([newLic, ...licenses]);
      setForm({
        license_type: "",
        license_number: "",
        issued_date: "",
        expiry_date: "",
        document: null,
        notes: "",
      });
    } catch {
      setError("Failed to upload license");
    }
  };

  return (
    <div className="min-h-[90vh] py-8 px-4 bg-gradient-to-b from-gray-50 to-blue-100 dark:from-neutral-900 dark:to-blue-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-300 mb-6 text-center tracking-tight">
          Licenses
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-900 shadow-lg p-6 rounded-xl mb-8 space-y-4 border border-gray-100 dark:border-neutral-800"
          encType="multipart/form-data"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                License Type
              </label>
              <select
                name="license_type"
                value={form.license_type}
                onChange={handleChange}
                className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              >
                <option value="">Select Type</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="hospital">Hospital</option>
                <option value="ngo">NGO</option>
                <option value="clinic">Clinic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                License Number
              </label>
              <input
                type="text"
                name="license_number"
                placeholder="License Number"
                value={form.license_number}
                onChange={handleChange}
                className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Issued Date
              </label>
              <input
                type="date"
                name="issued_date"
                placeholder="Issued Date"
                value={form.issued_date}
                onChange={handleChange}
                className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiry_date"
                placeholder="Expiry Date"
                value={form.expiry_date}
                onChange={handleChange}
                className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                License Document (PDF)
              </label>
              <input
                type="file"
                name="document"
                accept="application/pdf"
                onChange={handleChange}
                className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <input
                type="text"
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleChange}
                className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 dark:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Upload License
          </button>
        </form>
        {error && (
          <div className="mb-4 py-2 px-3 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded text-center border border-red-200 dark:border-red-700 animate-fadeIn">
            {error}
          </div>
        )}
        <div className="bg-white/90 dark:bg-neutral-900/95 px-5 py-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-lg">
          {loading ? (
            <div className="flex flex-col space-y-3 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 bg-gray-200 dark:bg-neutral-800 rounded-xl mb-2 w-full"></div>
              ))}
              <div className="text-gray-400 dark:text-gray-600 text-center italic">Loading licenses...</div>
            </div>
          ) : licenses.length === 0 ? (
            <div className="flex flex-col items-center py-8">
              <svg
                className="h-12 w-12 mb-2 text-gray-300 dark:text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v6m0 0H9m3 0h3"
                />
              </svg>
              <div className="text-gray-500 dark:text-gray-400 text-lg">No licenses found. Add one above.</div>
            </div>
          ) : (
            <ul className="space-y-6">
              {licenses.map((lic) => (
                <li
                  key={lic.id}
                  className="p-5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/80 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-x-6 gap-y-1 items-center">
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Type:</span>{" "}
                          <span className="text-blue-900 dark:text-blue-300">{lic.license_type}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Number:</span>{" "}
                          <span className="text-blue-900 dark:text-blue-300">{lic.license_number}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Status:</span>{" "}
                          <span className="text-blue-700 dark:text-blue-200">{lic.status}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Expiry:</span>{" "}
                          <span className="text-blue-900 dark:text-blue-300">{lic.expiry_date}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Uploaded by:</span>{" "}
                          <span className="text-blue-900 dark:text-blue-300">{lic.uploaded_by_email}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Visibility:</span>{" "}
                          <span className="text-blue-900 dark:text-blue-300">{lic.visibility_public ? "Public" : "Private"}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Notes:</span>{" "}
                          <span className="text-blue-900 dark:text-blue-300">{lic.notes}</span>
                        </div>
                      </div>
                      <div className="flex gap-6 mt-3 flex-wrap">
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Created:</span>{" "}
                          <span className="text-blue-900 dark:text-blue-300">
                            {lic.created_at ? new Date(lic.created_at).toLocaleString() : "-"}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">Document:</span>{" "}
                          <a
                            href={lic.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 dark:text-cyan-300 underline font-semibold hover:brightness-125 focus:underline focus:outline-none transition"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Licenses;