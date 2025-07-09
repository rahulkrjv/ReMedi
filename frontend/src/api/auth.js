import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api/auth/";

export async function login(email, password) {
  const res = await axios.post(`${API_BASE}token/`, { email, password });
  return res.data; // { access, refresh }
}

export async function register({ username, email, password, first_name, last_name, role }) {
  const res = await axios.post(`${API_BASE}register/`, {
    username,
    email,
    password,
    first_name,
    last_name,
    role,
  });
  return res.data;
}

export async function getUserInfo(token) {
  const res = await axios.get(`${API_BASE}me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}