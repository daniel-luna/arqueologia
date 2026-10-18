import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/main.layout";
import { AuthLayout } from "@/layouts/auth.layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Loading } from "@/components/Loading";

const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const MapPage = lazy(() =>
  import("@/pages/MapPage").then((m) => ({ default: m.MapPage })),
);
const SiteDetail = lazy(() =>
  import("@/pages/SiteDetail").then((m) => ({ default: m.SiteDetail })),
);
const Login = lazy(() => import("@/pages/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() =>
  import("@/pages/Register").then((m) => ({ default: m.Register })),
);
const Profile = lazy(() =>
  import("@/pages/Profile").then((m) => ({ default: m.Profile })),
);
const ForgotPassword = lazy(() =>
  import("@/pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })),
);
const UpdatePassword = lazy(() =>
  import("@/pages/UpdatePassword").then((m) => ({ default: m.UpdatePassword })),
);

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading message="Cargando página..." />}>{children}</Suspense>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <SuspenseWrapper>
              <Home />
            </SuspenseWrapper>
          }
        />
        <Route
          path="mapa"
          element={
            <SuspenseWrapper>
              <MapPage />
            </SuspenseWrapper>
          }
        />
        <Route
          path="sitio/:id"
          element={
            <SuspenseWrapper>
              <SiteDetail />
            </SuspenseWrapper>
          }
        />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <SuspenseWrapper>
                <Profile />
              </SuspenseWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="recuperar-password"
          element={
            <SuspenseWrapper>
              <ForgotPassword />
            </SuspenseWrapper>
          }
        />
        <Route
          path="actualizar-password"
          element={
            <SuspenseWrapper>
              <UpdatePassword />
            </SuspenseWrapper>
          }
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={
            <SuspenseWrapper>
              <Login />
            </SuspenseWrapper>
          }
        />
        <Route
          path="registro"
          element={
            <SuspenseWrapper>
              <Register />
            </SuspenseWrapper>
          }
        />
      </Route>
    </Routes>
  );
}
