import { Loader2 } from "lucide-react";

export function Loading({ message = "Cargando..." }: { message?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 py-16"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
