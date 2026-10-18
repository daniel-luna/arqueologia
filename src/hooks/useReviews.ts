import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewService } from "@/services";
import { REVIEWS_QUERY_KEY, SITE_QUERY_KEY } from "@/constants";

export function useReviews(siteId: string) {
  return useQuery({
    queryKey: [REVIEWS_QUERY_KEY, siteId],
    queryFn: () => ReviewService.getBySiteId(siteId),
    enabled: !!siteId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReviewService.create,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [REVIEWS_QUERY_KEY, variables.site_id],
      });
      queryClient.invalidateQueries({
        queryKey: [SITE_QUERY_KEY, variables.site_id],
      });
    },
  });
}
