import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

apiInstance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add("loading-indicator");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  function (response) {
    // UPDATE: Add this code to hide global loading indicator
    document.body.classList.remove("loading-indicator");
    return response;
  },
  async function (error) {
    document.body.classList.remove("loading-indicator");
    const originalConfig = error.config;
    if (error.response && error.response.status === 419) {
      try {
        const result = await apiInstance.post("auth/refresh-token", {
          refresh_token: localStorage.getItem("refresh_token"),
        });
        const { access_token, refresh_token } = result.data;

        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("access_token", access_token);
        originalConfig.headers["Authorization"] = `Bearer ${access_token}`;

        return apiInstance(originalConfig);
      } catch (err) {
        if (err.response && err.response.data.statusCode === 400) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
