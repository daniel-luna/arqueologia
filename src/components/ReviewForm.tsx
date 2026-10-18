import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RatingStars } from "@/components/RatingStars";

const reviewSchema = z.object({
  author_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo"),
  rating: z
    .number()
    .int()
    .min(1, "Selecciona una valoración")
    .max(5, "La valoración debe ser entre 1 y 5"),
  comment: z
    .string()
    .max(500, "El comentario no puede superar los 500 caracteres")
    .optional()
    .or(z.literal("")),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onSubmit: (values: ReviewFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export function ReviewForm({ onSubmit, isSubmitting }: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      author_name: "",
      rating: 0,
      comment: "",
    },
  });

  const currentRating = watch("rating");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="author_name">Nombre</Label>
        <Input
          id="author_name"
          {...register("author_name")}
          aria-invalid={!!errors.author_name}
          aria-describedby={errors.author_name ? "author_name-error" : undefined}
        />
        {errors.author_name && (
          <p
            id="author_name-error"
            className="mt-1 text-xs text-destructive"
            role="alert"
          >
            {errors.author_name.message}
          </p>
        )}
      </div>

      <div>
        <Label>Valoración</Label>
        <div className="mt-1">
          <RatingStars
            rating={currentRating}
            interactive
            onChange={(value) => setValue("rating", value, { shouldValidate: true })}
          />
        </div>
        {errors.rating && (
          <p className="mt-1 text-xs text-destructive" role="alert">
            {errors.rating.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="comment">Comentario (opcional)</Label>
        <Textarea
          id="comment"
          rows={3}
          {...register("comment")}
          aria-invalid={!!errors.comment}
          aria-describedby={errors.comment ? "comment-error" : undefined}
        />
        {errors.comment && (
          <p id="comment-error" className="mt-1 text-xs text-destructive" role="alert">
            {errors.comment.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Enviando..." : "Enviar valoración"}
      </Button>
    </form>
  );
}

export type { ReviewFormValues };
