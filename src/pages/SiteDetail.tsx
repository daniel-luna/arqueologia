import { useParams, Link } from "react-router-dom";
import { useSite } from "@/hooks/useSite";
import { useReviews, useCreateReview } from "@/hooks/useReviews";
import { useAverageRating } from "@/hooks/useAverageRating";
import { useAuthContext } from "@/contexts/auth.context";
import { Loading } from "@/components/Loading";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { RatingStars } from "@/components/RatingStars";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm, type ReviewFormValues } from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin } from "lucide-react";
import { formatRating } from "@/utils";
import { useState } from "react";

export function SiteDetail() {
  const { id } = useParams<{ id: string }>();
  const siteId = String(id);
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [locateMessage, setLocateMessage] = useState(false);

  const {
    data: site,
    isLoading: siteLoading,
    isError: siteError,
    error: siteErr,
    refetch: refetchSite,
  } = useSite(siteId);

  const {
    data: reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
    refetch: refetchReviews,
  } = useReviews(siteId);

  const { data: averageRating, isLoading: ratingLoading } = useAverageRating(siteId);

  const createReview = useCreateReview();

  if (siteLoading) return <Loading message="Cargando sitio..." />;

  if (siteError || !site) {
    return (
      <ErrorState
        message={siteErr?.message ?? "No se pudo cargar la información del sitio"}
        onRetry={() => refetchSite()}
      />
    );
  }

  const handleSubmitReview = async (values: ReviewFormValues) => {
    if (!user) return;

    await createReview.mutateAsync({
      site_id: siteId,
      profile_id: user.id,
      rating: values.rating,
      comment: values.comment ?? "",
      /* author_name: values.author_name, */
    });

    setShowForm(false);
  };

  const handleLocate = () => {
    setLocateMessage(true);
    setTimeout(() => setLocateMessage(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/mapa"
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al mapa
      </Link>

      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{site.name}</h1>
            {!ratingLoading && averageRating != null && (
              <div className="mt-2 flex items-center gap-2">
                <RatingStars rating={averageRating} size="sm" />
                <span className="text-sm text-muted-foreground">
                  {formatRating(averageRating)}
                </span>
              </div>
            )}
          </div>
          <Badge variant="secondary">{site.visibility_level}</Badge>
        </div>
      </div>

      {site.description && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mb-6 flex flex-wrap gap-4">
        {site.visibility_level === "public" && (
          <Card className="flex-1">
            <CardContent className="flex items-center gap-2 pt-4">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
              </span>
            </CardContent>
          </Card>
        )}
        <Button variant="outline" onClick={handleLocate} className="gap-2">
          <MapPin className="h-4 w-4" />
          Localizar
        </Button>
      </div>

      {locateMessage && (
        <div
          className="mb-4 rounded-md bg-muted px-4 py-2 text-center text-sm"
          role="status"
          aria-live="polite"
        >
          Próximamente
        </div>
      )}

      <Separator className="my-8" />

      <section aria-label="Valoraciones">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Valoraciones</h2>
          {user && !showForm && (
            <Button onClick={() => setShowForm(true)} size="sm">
              Añadir valoración
            </Button>
          )}
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Nueva valoración</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewForm
                onSubmit={handleSubmitReview}
                isSubmitting={createReview.isPending}
              />
            </CardContent>
          </Card>
        )}

        {reviewsLoading && <Loading message="Cargando valoraciones..." />}

        {reviewsError && (
          <ErrorState
            message="No se pudieron cargar las valoraciones"
            onRetry={() => refetchReviews()}
          />
        )}

        {reviews && reviews.length === 0 && (
          <EmptyState message="Aún no hay valoraciones para este sitio." />
        )}

        {reviews && reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {!user && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link to="/login" className="text-primary underline-offset-4 hover:underline">
              Inicia sesión
            </Link>{" "}
            para añadir una valoración.
          </p>
        )}
      </section>
    </div>
  );
}
