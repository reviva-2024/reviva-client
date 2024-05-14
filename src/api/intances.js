import axios from "axios";

const HOST = import.meta.env.VITE_ETC_API || "http://localhost:5000";

export const authURL = (token) =>
  axios.create({
    baseURL: `${HOST}/api/v0`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const noAuthURL = () =>
  axios.create({
    baseURL: `${HOST}/api/v0`,
  });

export const authFileURL = (token) => {
  return axios.create({
    baseURL: `${HOST}/api/v0`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};