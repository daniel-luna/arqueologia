/*
  TIPOS GENERADOS POR SUPABASE
  ==============================
  Reemplazar este archivo ejecutando:
    supabase gen types typescript --linked > src/types/database.ts

  Mantener la estructura de Database para que los servicios
  funcionen sin cambios tras la generación automática.
*/

export type Json =
  string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      sites: {
        Row: SiteRow;
        Insert: SiteInsert;
        Update: SiteUpdate;
        Relationships: [];
      };
      reviews: {
        Row: ReviewRow;
        Insert: ReviewInsert;
        Update: ReviewUpdate;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export interface SiteRow {
  id: number;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  visibility_level: string;
  created_at: string;
  author_id: string;
}

export interface SiteInsert {
  id?: number;
  name: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  visibility_level: string;
  created_at?: string;
  author_id: string;
}

export interface SiteUpdate {
  id?: number;
  name?: string;
  description?: string | null;
  latitude?: number;
  longitude?: number;
  visibility_level?: string;
  created_at?: string;
  author_id?: string;
}

export interface ReviewRow {
  id: number;
  site_id: number;
  user_id: string;
  rating: number;
  comment: string | null;
  author_name: string;
  created_at: string;
}

export interface ReviewInsert {
  id?: number;
  site_id: number;
  user_id: string;
  rating: number;
  comment?: string | null;
  author_name: string;
  created_at?: string;
}

export interface ReviewUpdate {
  id?: number;
  site_id?: number;
  user_id?: string;
  rating?: number;
  comment?: string | null;
  author_name?: string;
  created_at?: string;
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Site = Tables<"sites">;
export type Review = Tables<"reviews">;

export interface SiteMapMarker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  visibility_level: string;
}
