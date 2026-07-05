import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingState } from "@/components/ui";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingState message="Verificando autenticação..." />;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
