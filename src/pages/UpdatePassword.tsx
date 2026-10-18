import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdatePassword } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const updateSchema = z
  .object({
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type UpdateFormValues = z.infer<typeof updateSchema>;

export function UpdatePassword() {
  const updatePassword = useUpdatePassword();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit = async (values: UpdateFormValues) => {
    setErrorMessage(null);
    try {
      await updatePassword.mutateAsync(values.password);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Error al actualizar la contraseña",
      );
    }
  };

  return (
    <>
      <h1 className="mb-6 text-center text-xl font-semibold">Actualizar contraseña</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="password">Nueva contraseña</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p id="password-error" className="mt-1 text-xs text-destructive" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirm-password-error" : undefined
            }
          />
          {errors.confirmPassword && (
            <p
              id="confirm-password-error"
              className="mt-1 text-xs text-destructive"
              role="alert"
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        <Button type="submit" disabled={updatePassword.isPending} className="w-full">
          {updatePassword.isPending ? "Actualizando..." : "Actualizar contraseña"}
        </Button>
      </form>
    </>
  );
}
