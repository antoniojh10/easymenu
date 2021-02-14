import React from "react";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";

export type LoginInput = {
  email: string;
  password: string;
};

type LoginComponentProps = {
  sendLoginData: (data: LoginInput) => void;
};

function LoginComponent({ sendLoginData }: LoginComponentProps) {
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
          <label>Correo:</label>
          <input
            name="email"
            className={!errors.email ? "mb-1" : undefined}
            ref={register({
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo inválido"
              }
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <label>Contraseña:</label>
          <input
            name="password"
            className={!errors.password ? "mb-1" : undefined}
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
          {errors.password && <span>{errors.password.message}</span>}

          <button type="submit">Iniciar Sesión</button>
          <p>
            ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default LoginComponent;
