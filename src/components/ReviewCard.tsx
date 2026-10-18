import type { Review } from "@/types";
import { RatingStars } from "@/components/RatingStars";
import { formatDate } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="font-medium">{review.author_name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(review.created_at)}
            </p>
          </div>
          <RatingStars rating={review.rating} size="sm" />
        </div>
        {review.comment && (
          <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
        )}
      </CardContent>
    </Card>
  );
}
