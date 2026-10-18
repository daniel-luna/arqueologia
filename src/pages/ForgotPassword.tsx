import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useResetPassword } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const forgotSchema = z.object({
  email: z.string().email("Introduce un email válido"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export function ForgotPassword() {
  const resetPassword = useResetPassword();
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (values: ForgotFormValues) => {
    setErrorMessage(null);
    try {
      await resetPassword.mutateAsync(values.email);
      setSent(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error al enviar el email");
    }
  };

  if (sent) {
    return (
      <>
        <h1 className="mb-6 text-center text-xl font-semibold">Email enviado</h1>
        <p className="text-center text-sm text-muted-foreground">
          Si existe una cuenta con ese email, recibirás un enlace para restablecer tu
          contraseña.
        </p>
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-center text-xl font-semibold">Recuperar contraseña</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-destructive" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        <Button type="submit" disabled={resetPassword.isPending} className="w-full">
          {resetPassword.isPending ? "Enviando..." : "Enviar enlace"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/login" className="text-primary underline-offset-4 hover:underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </>
  );
}
