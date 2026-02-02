import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";
import type { AuthTokens } from "../../domain/entities/Auth";

const apiBaseURL = import.meta.env.VITE_API_URL;

export const httpClient = axios.create({
  baseURL: apiBaseURL,
});

let isRefreshing = false;
let failedRequestsQueue: Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}> = [];

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { access_token } = useAuthStore.getState();

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function rejectAndClearQueue(error: AxiosError) {
  const auth = useAuthStore.getState();
  auth.logout();
  failedRequestsQueue.forEach((req) => req.onFailure(error));
  failedRequestsQueue = [];
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const auth = useAuthStore.getState();

    if (originalRequest.url?.includes("/autenticacao/refresh")) {
      rejectAndClearQueue(error);
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(httpClient(originalRequest));
          },
          onFailure: reject,
        });
      });
    }

    if (auth.isRefreshTokenExpired() || !auth.refresh_token) {
      rejectAndClearQueue(error);
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.put<AuthTokens>(
        `${apiBaseURL}/autenticacao/refresh`,
        null,
        { headers: { Authorization: `Bearer ${auth.refresh_token}` } }
      );

      auth.setAuth(data);

      failedRequestsQueue.forEach((request) => request.onSuccess(data.access_token));
      failedRequestsQueue = [];

      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
      return httpClient(originalRequest);
    } catch (refreshError) {
      rejectAndClearQueue(refreshError as AxiosError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
