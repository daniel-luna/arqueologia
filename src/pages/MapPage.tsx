import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSites } from "@/hooks/useSites";
import { Map } from "@/components/Map";
import { Loading } from "@/components/Loading";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "@/components/ui/button";
import { LocateIcon } from "lucide-react";

export function MapPage() {
  const { data: sites, isLoading, isError, error, refetch } = useSites();
  const { latitude, longitude, requestPosition } = useGeolocation();
  const navigate = useNavigate();
  const [showLocate, setShowLocate] = useState(false);

  const center: [number, number] | undefined =
    latitude && longitude ? [latitude, longitude] : undefined;

  const handleMarkerClick = useCallback(
    (id: number) => {
      navigate(`/sitio/${id}`);
    },
    [navigate],
  );

  const handleLocate = useCallback(() => {
    requestPosition();
    setShowLocate(true);
    setTimeout(() => setShowLocate(false), 3000);
  }, [requestPosition]);

  if (isLoading) return <Loading message="Cargando mapa..." />;

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "No se pudo cargar el mapa"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!sites || sites.length === 0) {
    return <EmptyState message="No hay yacimientos disponibles en el mapa." />;
  }

  return (
    <div className="relative h-[calc(100dvh-4rem)] w-full">
      <Map
        markers={sites}
        onMarkerClick={handleMarkerClick}
        center={center}
        className="h-full w-full"
      />
      <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleLocate}
          aria-label="Localizar mi posición"
          title="Localizar mi posición"
        >
          <LocateIcon className="h-5 w-5" />
        </Button>
      </div>
      {showLocate && (
        <div
          className="absolute bottom-4 left-1/2 z-[1000] -translate-x-1/2 rounded-lg bg-card px-4 py-2 text-sm shadow-lg"
          role="status"
          aria-live="polite"
        >
          {latitude && longitude ? "Posición obtenida" : "Buscando posición..."}
        </div>
      )}
    </div>
  );
}
