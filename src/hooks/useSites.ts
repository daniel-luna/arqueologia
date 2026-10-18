import { useQuery } from "@tanstack/react-query";
import { SiteService } from "@/services";
import { SITE_QUERY_KEY } from "@/constants";

export function useSites() {
  return useQuery({
    queryKey: [SITE_QUERY_KEY],
    queryFn: SiteService.getMapMarkers,
  });
}
