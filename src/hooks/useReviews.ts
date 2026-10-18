import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewService } from "@/services";
import { REVIEWS_QUERY_KEY } from "@/constants";

export function useReviews(siteId: string) {
  return useQuery({
    queryKey: [REVIEWS_QUERY_KEY, siteId],
    queryFn: () => ReviewService.getBySiteId(siteId),
    enabled: Number.isFinite(siteId),
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ReviewService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [REVIEWS_QUERY_KEY, data.site_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["sites", data.site_id],
      });
    },
  });
}
