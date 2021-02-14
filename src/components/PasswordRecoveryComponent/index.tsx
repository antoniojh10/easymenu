import React from "react";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";

export type RecoverPasswordInput = {
  email: string;
};

type PasswordRecoveryComponentProps = {
  sendEmail: (email: string) => void;
};

function PasswordRecoveryComponent({
  sendEmail
}: PasswordRecoveryComponentProps) {
  const {
    register,
    handleSubmit,
    errors,
    reset
  } = useForm<RecoverPasswordInput>({
    mode: "onChange"
  });

  const onSubmit = async (data: RecoverPasswordInput) => {
    await sendEmail(data.email);
    reset();
  };

  return (
    <>
      <h1>Recuperar Contraseña</h1>
      <section className="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Correo:</label>
          <input
            name="email"
            className={!errors.email ? "mb-1" : undefined}
            aria-label="email"
            aria-invalid={errors.email ? "true" : "false"}
            ref={register({
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo inválido"
              }
            })}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}

          <button type="submit">Recuperar contraseña</button>
          <p>
            ¿Recordaste la contraseña? <Link to="/signin">Inicia Sesión</Link>
          </p>
          <p>
            ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default PasswordRecoveryComponent;
