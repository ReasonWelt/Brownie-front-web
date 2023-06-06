import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

//请求拦截
service.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
    if (token) {
      const account = JSON.parse(localStorage.getItem("userInfo")).account;
      token ? (config.headers.token = token) : null;
      account ? (config.headers.account = account) : null;
    }
  return config;
  });

// response interceptor
service.interceptors.response.use((response) => {
  return response.data;
});

export default service;
