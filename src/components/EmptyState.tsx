import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No hay datos disponibles." }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16">
      <Inbox className="h-12 w-12 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
