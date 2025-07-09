import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api/orgs/";

export async function getMyOrgProfile(token) {
  const res = await axios.get(`${API_BASE}profiles/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // For non-admins, should only return one profile
  return res.data[0] || null;
}

export async function createOrgProfile(data, token) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const res = await axios.post(`${API_BASE}profiles/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateOrgProfile(id, data, token) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const res = await axios.patch(`${API_BASE}profiles/${id}/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}