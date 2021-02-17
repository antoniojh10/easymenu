import React from "react";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export type RegisterInput = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterComponentProps = {
  sendRegisterData: (data: RegisterInput) => Promise<void>;
  registerError: undefined | string;
};

function RegisterComponent({
  sendRegisterData,
  registerError
}: RegisterComponentProps) {
  const { register, handleSubmit, getValues, errors } = useForm<RegisterInput>({
    mode: "onChange"
  });

  const onSubmit = async (data: RegisterInput) => {
    await sendRegisterData(data);
  };

  return (
    <>
      <h1>Register</h1>
      <section className="register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage prefix="register" errorCode={registerError} />
          <label>Nombre:</label>
          <input
            name="firstName"
            className={!errors.firstName ? "mb-1" : undefined}
            aria-label="firstName"
            aria-invalid={errors.firstName ? "true" : "false"}
            ref={register({
              required: "Este campo es requerido"
            })}
          />
          {errors.firstName && (
            <span role="alert">{errors.firstName.message}</span>
          )}

          <label>Apellido:</label>
          <input
            name="lastName"
            className={!errors.lastName ? "mb-1" : undefined}
            aria-label="lastName"
            aria-invalid={errors.lastName ? "true" : "false"}
            ref={register({
              required: "Este campo es requerido"
            })}
          />
          {errors.lastName && (
            <span role="alert">{errors.lastName.message}</span>
          )}

          <label>Nombre de usuario:</label>
          <input
            name="username"
            className={!errors.username ? "mb-1" : undefined}
            aria-label="username"
            aria-invalid={errors.username ? "true" : "false"}
            ref={register({
              required: "Este campo es requerido",
              validate: (value: string) => {
                return (
                  !value.includes(" ") ||
                  "El nombre de usuario no puede contener espacios."
                );
              }
            })}
          />
          {errors.username && (
            <span role="alert">{errors.username.message}</span>
          )}

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

          <label>Confirmar contraseña:</label>
          <input
            name="confirmPassword"
            className={!errors.confirmPassword ? "mb-1" : undefined}
            aria-label="confirmPassword"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            ref={register({
              required: "Este campo es requerido",
              validate: {
                passwordsMustBeEquals: (value: string) => {
                  const { password }: RegisterInput = getValues();
                  return (
                    value === password || "Las contraseñas deben coincidir"
                  );
                }
              }
            })}
          />
          {errors.confirmPassword && (
            <span role="alert">{errors.confirmPassword.message}</span>
          )}

          <button type="submit">Registrarse</button>
          <p>
            ¿Ya tienes una cuenta? <Link to="/signin">Inicia sesión</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default RegisterComponent;
