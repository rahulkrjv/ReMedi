import axios from "axios";

const API_URL = "/api/requests/";

export const getRequests = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getRequest = async (id, token) => {
  const res = await axios.get(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createRequest = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateRequest = async (id, data, token) => {
  const res = await axios.put(`${API_URL}${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteRequest = async (id, token) => {
  const res = await axios.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};