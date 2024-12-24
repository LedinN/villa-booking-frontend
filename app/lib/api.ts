import axios, { AxiosError } from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Please login.");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

export default apiClient;