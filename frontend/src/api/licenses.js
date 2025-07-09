import axios from "axios";

const API_URL = "/api/licenses/";

export const getLicenses = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getLicense = async (id, token) => {
  const res = await axios.get(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createLicense = async (formData, token) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateLicense = async (id, formData, token) => {
  const res = await axios.put(`${API_URL}${id}/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteLicense = async (id, token) => {
  const res = await axios.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};