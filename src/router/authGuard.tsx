import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../app/store/authStore";
import { useShallow } from "zustand/react/shallow";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { access_token, authenticated_at, expires_in } = useAuthStore(
    useShallow((state) => ({
      access_token: state.access_token,
      authenticated_at: state.authenticated_at,
      expires_in: state.expires_in,
    }))
  );

  const isAuthenticated = (() => {
    if (!access_token) return false;
    if (!authenticated_at || !expires_in) return false;
    const expiresAt = authenticated_at + expires_in * 1000;
    return Date.now() < expiresAt - 30000;
  })();

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/pets" replace />;
  }

  return <Outlet />;
}
