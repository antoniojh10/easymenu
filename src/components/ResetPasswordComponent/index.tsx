import React from "react";
import { useForm } from "react-hook-form";

export type ResetPasswordInput = {
  password: string;
  confirmPassword: string;
};

type ResetPasswordComponentProps = {
  resetPassword: (data: ResetPasswordInput) => Promise<void>;
  code: string | undefined;
};

function ResetPasswordComponent({
  resetPassword,
  code
}: ResetPasswordComponentProps) {
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    reset
  } = useForm<ResetPasswordInput>({
    mode: "onChange"
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    await resetPassword(data);
    reset();
  };

  return (
    <>
      <h1>Recuperar Contraseña</h1>
      <section className="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nueva contraseña:</label>
          <input
            name="password"
            className={!errors.password ? "mb-1" : undefined}
            aria-label="password"
            aria-invalid={errors.password ? "true" : "false"}
            ref={register({
              required: "Este campo es requerido",
              validate: {
                weakPassword: (value: string) => {
                  return (
                    value.length >= 6 ||
                    "La contraseña debe tener al menos 6 caracteres"
                  );
                }
              }
            })}
          />
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}

          <label>Confirmar nueva contraseña:</label>
          <input
            name="confirmPassword"
            className={!errors.confirmPassword ? "mb-1" : undefined}
            aria-label="confirmPassword"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            ref={register({
              required: "Este campo es requerido",
              validate: {
                passwordsMustBeEquals: (value: string) => {
                  const { password }: ResetPasswordInput = getValues();
                  return (
                    value === password || "Las contraseñas deben coincidirs"
                  );
                }
              }
            })}
          />
          {errors.confirmPassword && (
            <span role="alert">{errors.confirmPassword.message}</span>
          )}

          <button type="submit">Guardar contraseña</button>
        </form>
      </section>
    </>
  );
}

export default ResetPasswordComponent;
