import { supabase } from "@/lib/supabase";
import type { Review } from "@/types";

interface CreateReviewParams {
  site_id: string;
  profile_id: string;
  rating: number;
  comment: string;
  /* author_name: string; */
}

export const ReviewService = {
  async getBySiteId(siteId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("site_id", siteId)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });

    if (error) throw error;
    return (data ?? []) as Review[];
  },

  async create(params: CreateReviewParams): Promise<Review> {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        site_id: params.site_id,
        profile_id: params.profile_id,
        rating: params.rating,
        comment: params.comment,
        /* author_name: params.author_name, */
      })
      .select()
      .single();

    if (error) throw error;
    return data as Review;
  },
};
