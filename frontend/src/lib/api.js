import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const setAdminToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-admin-token"] = token;
    localStorage.setItem("megha_admin_token", token);
  } else {
    delete api.defaults.headers.common["x-admin-token"];
    localStorage.removeItem("megha_admin_token");
  }
};

const saved = typeof window !== "undefined" ? localStorage.getItem("megha_admin_token") : null;
if (saved) {
  api.defaults.headers.common["x-admin-token"] = saved;
}

export const getAdminToken = () => localStorage.getItem("megha_admin_token");
