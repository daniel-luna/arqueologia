import { Outlet, Link } from "react-router-dom";
import { APP_NAME } from "@/constants";

export function AuthLayout() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <Link
        to="/"
        className="mb-8 text-2xl font-bold text-primary transition-colors hover:text-primary/80"
      >
        {APP_NAME}
      </Link>
      <div className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
