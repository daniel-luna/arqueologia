import { Link } from "react-router-dom";
import { useAuthContext } from "@/contexts/auth.context";
import { APP_NAME } from "@/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          {APP_NAME}
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/mapa"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Mapa
          </Link>
          {user ? (
            <Link to="/perfil">
              <Button variant="outline" size="sm">
                Perfil
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm">Entrar</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
