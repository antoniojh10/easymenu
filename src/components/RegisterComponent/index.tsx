import React from "react";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterComponent() {
  const { register, handleSubmit, getValues, errors } = useForm<RegisterInput>({
    mode: "onChange"
  });

  const onSubmit = (data: RegisterInput) => {
    console.log(data);
  };

  return (
    <>
      <h1>Register</h1>
      <section className="register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nombre:</label>
          <input
            name="firstName"
            className={!errors.firstName ? "mb-1" : undefined}
            ref={register({
              required: "Este campo es requerido"
            })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}

          <label>Apellido:</label>
          <input
            name="lastName"
            className={!errors.lastName ? "mb-1" : undefined}
            ref={register({
              required: "Este campo es requerido"
            })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}

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

          <label>Confirmar contraseña:</label>
          <input
            name="confirmPassword"
            className={!errors.confirmPassword ? "mb-1" : undefined}
            ref={register({
              required: "Este campo es requerido",
              validate: {
                passwordsMustBeEquals: (value: string) => {
                  const { password }: RegisterInput = getValues();
                  return (
                    value === password || "Las contraseñas deben coincidirs"
                  );
                }
              }
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}

          <button type="submit">Registrarse</button>
          <p>
            ¿Ya tienes una cuaenta? <Link to="/signin">Inicia sesión</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default RegisterComponent;
