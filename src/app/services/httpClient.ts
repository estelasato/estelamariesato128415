import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";
import type { AuthTokens } from "../../domain/entities/Auth";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let failedRequestsQueue: Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}> = [];

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { access_token, isTokenExpired, isRefreshTokenExpired } =
      useAuthStore.getState();

    if (isTokenExpired() && isRefreshTokenExpired()) {
      useAuthStore.getState().logout();
    }

    if (access_token && config.headers) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/autenticacao/refresh")) {
      useAuthStore.getState().logout();
      failedRequestsQueue = [];
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(httpClient(originalRequest));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const { refresh_token, isRefreshTokenExpired } = useAuthStore.getState();

    if (!refresh_token || isRefreshTokenExpired()) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post<AuthTokens>(
        `${import.meta.env.VITE_API_URL}/autenticacao/refresh`,
        null,
        {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        }
      );

      useAuthStore.getState().setAuth(data);

      failedRequestsQueue.forEach((request) => {
        request.onSuccess(data.access_token);
      });
      failedRequestsQueue = [];

      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
      return httpClient(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().logout();
      failedRequestsQueue.forEach((request) => {
        request.onFailure(refreshError as AxiosError);
      });
      failedRequestsQueue = [];
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
