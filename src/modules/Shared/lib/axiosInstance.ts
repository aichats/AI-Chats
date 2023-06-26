import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // headers: {
  //   //  Authorization: `<Your Auth Token>`,
  //   "Content-Type": "application/json",
  //   timeout: 1000,
  // },
  // .. other options
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["accept"] = "application/json";

    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // const originalRequest = error.config;

    if (error.response.status === 401) {
      //session expired, login if wallet address is present
      // toast.error("Session expired. Authenticating");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
