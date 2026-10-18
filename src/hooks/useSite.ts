import { useQuery } from "@tanstack/react-query";
import { SiteService } from "@/services";
import { SITE_QUERY_KEY } from "@/constants";

export function useSite(id: string) {
  return useQuery({
    queryKey: [SITE_QUERY_KEY, id],
    queryFn: () => SiteService.getById(id),
    enabled: true, //Number.isFinite(id),
  });
}
