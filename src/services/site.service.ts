import { supabase } from "@/lib/supabase";
import type { Site, SiteMapMarker } from "@/types";

export const SiteService = {
  async getMapMarkers(): Promise<SiteMapMarker[]> {
    const { data, error } = await supabase
      .from("sites")
      .select("id, name, latitude, longitude, visibility_level");

    if (error) throw error;
    return (data ?? []) as SiteMapMarker[];
  },

  async getById(id: string): Promise<Site> {
    const { data, error } = await supabase
      .from("sites")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Site;
  },

  async getAverageRating(siteId: string): Promise<number | null> {
    const { data, error } = await supabase
      .from("reviews")
      .select("rating")
      .eq("site_id", siteId);

    if (error) throw error;

    const ratings = (data ?? []) as { rating: number }[];

    if (ratings.length === 0) return null;

    const sum = ratings.reduce((acc, review) => acc + review.rating, 0);
    return sum / ratings.length;
  },
};
