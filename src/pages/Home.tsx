import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_DESCRIPTION } from "@/constants";
import { MapIcon } from "lucide-react";

export function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        {APP_NAME}
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground sm:text-lg">{APP_DESCRIPTION}</p>
      <Link to="/mapa" className="mt-8">
        <Button size="lg" className="gap-2">
          <MapIcon className="h-5 w-5" />
          Explorar mapa
        </Button>
      </Link>
    </section>
  );
}
