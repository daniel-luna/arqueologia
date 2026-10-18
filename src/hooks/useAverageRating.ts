import { useQuery } from "@tanstack/react-query";
import { SiteService } from "@/services";
import { SITE_QUERY_KEY } from "@/constants";

export function useAverageRating(siteId: string) {
  return useQuery({
    queryKey: [SITE_QUERY_KEY, siteId, "average-rating"],
    queryFn: () => SiteService.getAverageRating(siteId),
    enabled: true, //Number.isFinite(siteId),
  });
}
