import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Ha ocurrido un error al cargar los datos.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16" role="alert">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <p className="text-center text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Intentar de nuevo
        </Button>
      )}
    </div>
  );
}
