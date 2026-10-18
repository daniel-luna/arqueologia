import { useAuthContext } from "@/contexts/auth.context";
import { useLogout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function Profile() {
  const { user } = useAuthContext();
  const logout = useLogout();

  const initials = user?.user_metadata?.name
    ? (user.user_metadata.name as string)
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (user?.email?.slice(0, 2).toUpperCase() ?? "??");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card>
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-16 w-16">
            <AvatarFallback className="bg-primary text-lg text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-2">{user?.user_metadata?.name as string}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm">{user?.email}</p>
            </div>
            {user?.created_at && (
              <div>
                <p className="text-xs text-muted-foreground">Miembro desde</p>
                <p className="text-sm">
                  {new Date(user.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <Button
            variant="destructive"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="w-full"
          >
            {logout.isPending ? "Cerrando sesión..." : "Cerrar sesión"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
