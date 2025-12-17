import axios from "axios";
import useAuthStore from "../zustand/useAuthStore";

const baseURL = import.meta.env.VITE_API_URL ||  "http://127.0.0.1:8000"

export const apiRequest = axios.create({
  baseURL: `${baseURL}/api`
})

// automatically attach access token to api request
apiRequest.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// generate new access token when acces token is invalid 
// also logout user when refresh token is expired

apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const store = useAuthStore.getState();

    // prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // request new access token
        const res = await axios.post(
          `${baseURL}/api/auth/token/refresh/`,
          {
            refresh: store.refreshToken,
            access: store.accessToken
          }
        );

        const newAccessToken = res.data.access;

        // update zustand store
        useAuthStore.getState().setTokens({
          accessToken: newAccessToken,
          refreshToken: store.refreshToken,
        });

        // update header & retry request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiRequest(originalRequest);
      } catch (refreshError) {
        // refresh token expired → logout
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
