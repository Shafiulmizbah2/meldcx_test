import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const token = JSON.parse(localStorage.getItem("user"));

if (token) {
  AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  AxiosInstance.defaults.headers.common["Authorization"] = "";
}

export default AxiosInstance;
