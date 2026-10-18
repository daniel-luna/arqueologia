import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/auth.context";
import { Loading } from "@/components/Loading";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <Loading message="Verificando sesión..." />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
