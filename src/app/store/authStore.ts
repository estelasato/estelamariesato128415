import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthTokens } from "../../domain/entities/Auth";

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  expires_in: number | null;
  refresh_expires_in: number | null;
  authenticated_at: number | null;
}

interface AuthActions {
  setAuth: (data: AuthTokens) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isTokenExpired: () => boolean;
  isRefreshTokenExpired: () => boolean;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  expires_in: null,
  refresh_expires_in: null,
  authenticated_at: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAuth: ({ access_token, refresh_token, expires_in, refresh_expires_in }) => {
        set({
          access_token,
          refresh_token: refresh_token ?? null,
          expires_in,
          refresh_expires_in,
          authenticated_at: Date.now(),
        });
      },

      logout: () => {
        set(initialState);
      },

      isAuthenticated: () => {
        const { access_token } = get();
        return !!access_token && !get().isTokenExpired();
      },

      isTokenExpired: () => {
        const { authenticated_at, expires_in } = get();
        if (!authenticated_at || !expires_in) return true;

        const expiresAt = authenticated_at + expires_in * 1000;
        // p/ race condition, margem de 30s
        return Date.now() >= expiresAt - 30000;
      },

      isRefreshTokenExpired: () => {
        const { authenticated_at, refresh_expires_in } = get();
        if (!authenticated_at || !refresh_expires_in) return true;

        const expiresAt = authenticated_at + refresh_expires_in * 1000;
        return Date.now() >= expiresAt;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        expires_in: state.expires_in,
        refresh_expires_in: state.refresh_expires_in,
        authenticated_at: state.authenticated_at,
      }),
    }
  )
);
