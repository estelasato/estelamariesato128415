import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../app/store/authStore";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
