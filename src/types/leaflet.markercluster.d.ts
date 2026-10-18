import "leaflet";

declare module "leaflet" {
  interface MarkerClusterGroupOptions {
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    maxClusterRadius?: number;
    iconCreateFunction?: (cluster: MarkerCluster) => DivIcon;
    [key: string]: unknown;
  }

  interface MarkerCluster extends Marker {
    getChildCount(): number;
  }

  interface MarkerClusterGroup extends FeatureGroup {
    addLayer(layer: Layer): this;
    removeLayer(layer: Layer): this;
  }

  function markerClusterGroup(options?: MarkerClusterGroupOptions): MarkerClusterGroup;
}
