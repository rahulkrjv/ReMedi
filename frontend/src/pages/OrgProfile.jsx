import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getMyOrgProfile,
  createOrgProfile,
  updateOrgProfile,
} from "../api/orgs";

const ORG_TYPES = [
  { value: "HOSPITAL", label: "Hospital" },
  { value: "PHARMACY", label: "Pharmacy" },
  { value: "NGO", label: "NGO" },
  { value: "CLINIC", label: "Clinic" },
];

export default function OrgProfile() {
  const { access, user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    org_type: user?.role || "HOSPITAL",
    license_number: "",
    license_document: null,
    address: "",
    phone: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!access) return;
    setLoading(true);
    setError("");
    getMyOrgProfile(access)
      .then((data) => {
        setProfile(data);
        if (data) {
          setForm({
            name: data.name || "",
            org_type: data.org_type || user?.role || "HOSPITAL",
            license_number: data.license_number || "",
            license_document: null,
            address: data.address || "",
            phone: data.phone || "",
          });
        }
        setError("");
      })
      .catch(() => setError("Could not load organization profile."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [access]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      let data = { ...form };
      if (profile) {
        await updateOrgProfile(profile.id, data, access);
        setSuccess("Profile updated!");
      } else {
        await createOrgProfile(data, access);
        setSuccess("Profile created!");
      }
      setEditMode(false);
      const updated = await getMyOrgProfile(access);
      setProfile(updated);
    } catch {
      setError("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-neutral-900 dark:to-blue-950 animate-fadeIn">
        <div className="w-full max-w-md p-7 bg-white/70 dark:bg-neutral-900/70 rounded-2xl border border-blue-100 dark:border-neutral-800 shadow-lg animate-pulse">
          <div className="h-7 w-1/2 bg-gray-200 dark:bg-neutral-800 rounded mb-6"></div>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-5 w-full bg-gray-200 dark:bg-neutral-800 rounded mb-4"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-neutral-900 dark:to-blue-950 transition-colors duration-300 animate-fadeIn">
      <div className="w-full max-w-xl bg-white dark:bg-neutral-900/95 p-7 rounded-2xl shadow-2xl border border-blue-100 dark:border-neutral-800">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-300 mb-6 text-center tracking-tight">
          Organization Profile
        </h2>
        {error && (
          <div className="mb-4 py-2 px-3 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded text-center border border-red-200 dark:border-red-700 animate-fadeIn">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 py-2 px-3 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded text-center border border-green-200 dark:border-green-700 animate-fadeIn">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Organization Name
            </label>
            <input
              type="text"
              name="name"
              className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={form.name}
              onChange={handleChange}
              required
              disabled={!editMode}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Type
            </label>
            <select
              name="org_type"
              className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={form.org_type}
              onChange={handleChange}
              disabled={!editMode}
            >
              {ORG_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              License Number
            </label>
            <input
              type="text"
              name="license_number"
              className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={form.license_number}
              onChange={handleChange}
              required
              disabled={!editMode}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              License Document
            </label>
            {profile && profile.license_document && !editMode ? (
              <a
                href={profile.license_document}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-cyan-300 underline font-semibold hover:brightness-125 focus:underline focus:outline-none transition"
              >
                View Uploaded License
              </a>
            ) : (
              <input
                type="file"
                name="license_document"
                className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                required={!profile}
                disabled={!editMode}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Address
            </label>
            <textarea
              name="address"
              className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition resize-none"
              value={form.address}
              onChange={handleChange}
              required
              disabled={!editMode}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              className="rounded-md border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={form.phone}
              onChange={handleChange}
              required
              disabled={!editMode}
            />
          </div>
          <div className="flex justify-between gap-3 pt-2">
            {editMode ? (
              <>
                <button
                  type="submit"
                  className="bg-green-600 dark:bg-green-700 text-white py-2 px-5 rounded-md font-bold hover:bg-green-700 dark:hover:bg-green-800 shadow focus-visible:ring-2 focus-visible:ring-green-400 transition"
                  disabled={loading}
                >
                  {profile ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="bg-gray-400 dark:bg-neutral-700 text-white py-2 px-5 rounded-md font-bold hover:bg-gray-500 dark:hover:bg-neutral-800 shadow focus-visible:ring-2 focus-visible:ring-gray-400 transition"
                  onClick={() => setEditMode(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-5 rounded-md font-bold hover:bg-blue-700 dark:hover:bg-blue-800 shadow focus-visible:ring-2 focus-visible:ring-blue-400 transition"
                onClick={() => setEditMode(true)}
              >
                {profile ? "Edit Profile" : "Create Profile"}
              </button>
            )}
          </div>
        </form>
        {profile && (
          <div className="mt-7 p-4 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/80 text-gray-700 dark:text-gray-200 shadow-sm">
            <div className="flex flex-wrap gap-x-9 gap-y-2 items-center text-base">
              <div>
                <span className="font-semibold">Verified:</span>{" "}
                {profile.is_verified ? (
                  <span className="text-green-700 dark:text-green-400 font-medium">Yes</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 font-medium">No</span>
                )}
              </div>
              <div>
                <span className="font-semibold">Created:</span>{" "}
                <span>
                  {profile.created_at ? new Date(profile.created_at).toLocaleString() : "-"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Updated:</span>{" "}
                <span>
                  {profile.updated_at ? new Date(profile.updated_at).toLocaleString() : "-"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}