import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import type { SiteMapMarker } from "@/types";
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from "@/constants";

interface MapProps {
  markers: SiteMapMarker[];
  onMarkerClick: (id: number) => void;
  center?: [number, number];
  zoom?: number;
  className?: string;
}

function createSiteIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="width: 12px; height: 12px; background: oklch(0.4 0.06 50); border: 2px solid oklch(0.95 0.01 85); border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

function MarkerClusterLayer({
  markers,
  onMarkerClick,
}: {
  markers: SiteMapMarker[];
  onMarkerClick: (id: number) => void;
}) {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
    }

    const mcg = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 50,
    });

    const icon = createSiteIcon();

    markers.forEach((marker) => {
      const m = L.marker([marker.latitude, marker.longitude], { icon });
      m.bindPopup(
        `<div style="font-family: system-ui, sans-serif; min-width: 140px;">
          <p style="font-weight: 600; margin: 0 0 4px; font-size: 14px;">${marker.name}</p>
          <button
            style="background: oklch(0.4 0.06 50); color: white; border: none; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; width: 100%;"
            data-site-id="${marker.id}"
          >Ver detalle</button>
        </div>`,
      );
      m.on("popupopen", () => {
        const popup = m.getPopup();
        if (popup) {
          const container = popup.getElement();
          if (container) {
            const btn = container.querySelector(
              `[data-site-id="${marker.id}"]`,
            ) as HTMLButtonElement | null;
            if (btn) {
              btn.onclick = () => onMarkerClick(marker.id);
            }
          }
        }
      });
      mcg.addLayer(m);
    });

    map.addLayer(mcg);
    clusterGroupRef.current = mcg;

    return () => {
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
      }
    };
  }, [map, markers, onMarkerClick]);

  return null;
}

export function Map({
  markers,
  onMarkerClick,
  center = MAP_DEFAULT_CENTER,
  zoom = MAP_DEFAULT_ZOOM,
  className,
}: MapProps) {
  return (
    <div className={className} role="application" aria-label="Mapa de yacimientos">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterLayer markers={markers} onMarkerClick={onMarkerClick} />
      </MapContainer>
    </div>
  );
}
