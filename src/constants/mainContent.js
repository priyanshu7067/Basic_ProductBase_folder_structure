import logo from "../assets/logo.jpg";
import logo1 from "../assets/logo.jpg";
import axios from "axios";
import Swal from "sweetalert2";


export const MainContent = {
  name: "Office l",
  logo: logo,
  logo1: logo1,
};

export const backendConfig = {

  // base: "https://api.Office .starchainlabs.in/api", 
  // origin: "https://api.Office .starchainlabs.in",


  // base: "http://192.168.1.8:6096/api",
  // origin: "http://192.168.1.8:6096",
};

export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Unauthorized! Logging out...");
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
    }

    return Promise.reject(error);
  }
);