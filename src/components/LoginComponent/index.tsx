import React from "react";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export type LoginInput = {
  email: string;
  password: string;
};

type LoginComponentProps = {
  sendLoginData: (data: LoginInput) => Promise<void>;
  passwordChanged: true | undefined;
  loginError: undefined | string;
};

function LoginComponent({
  sendLoginData,
  passwordChanged,
  loginError
}: LoginComponentProps) {
  const { register, handleSubmit, errors, reset } = useForm<LoginInput>({
    mode: "onChange"
  });

  const onSubmit = async (data: LoginInput) => {
    await sendLoginData(data);
    reset();
  };

  return (
    <>
      <h1>Login</h1>
      <section className="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          {passwordChanged && <p>Su contraseña ha cambiado correctamente</p>}
          <ErrorMessage prefix="login" errorCode={loginError} />
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

          <label>Contraseña:</label>
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

          <button type="submit">Iniciar Sesión</button>
          <p>
            ¿No recuerdas tu contraseña?{" "}
            <Link to="/recover-password">Recuperala</Link>
          </p>
          <p>
            ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default LoginComponent;
