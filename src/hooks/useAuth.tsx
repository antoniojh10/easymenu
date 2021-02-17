import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import { registerNewUser } from "@/api/firebase";

export type Auth = {
  user: firebase.User | null;
  signin: (email: string, password: string) => Promise<undefined | Error>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<Error | undefined>;
  signout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<undefined | Error>;
  verifyResetPasswordCode: (code: string) => Promise<string | undefined>;
  confirmPasswordReset: (
    code: string,
    password: string
  ) => Promise<Boolean | undefined>;
};

export type Error = {
  code: string;
  message: string;
};

const authContext = React.createContext({} as Auth);

/**
 * Authentication Context Provider
 * @param children Children components podrán acceder correctamente al hook useAuth
 */
export const ProvideAuth: React.FC = ({ children }) => {
  const auth: Auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

/**
 * Auth Hook, usar para acceder a los datos del usuario o a las funciones:
 * @method signin
 * @method signup
 * @method signout
 * @method sendPasswordResetEmail
 * @method confirmPasswordReset
 */
export function useAuth(): Auth {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState<firebase.User | null>(null);

  /**
   * Función para iniciar sesión
   * @param email
   * @param password
   */
  const signin = async (email: string, password: string) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      setUser(response.user);
    } catch (error) {
      console.error(error);
      return error as Error;
    }
  };

  /**
   * Funcion para registro básico de usuarios
   * @param email
   * @param password
   */
  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (!response.user?.uid) throw new Error("Ha ocurrido un error");

      await registerNewUser({
        id: response.user?.uid,
        firstName,
        lastName,
        email
      });
      setUser(response.user);
    } catch (error) {
      console.error(error);
      return error as Error;
    }
  };

  /**
   * Función para cerrar sesión
   */
  const signout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Función para pedir el reset de la contraseña
   * @param email
   */
  const sendPasswordResetEmail = async (email: string) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error(error);
      return error as Error;
    }
  };

  /**
   * Función para verificar el código del parámetro del email para reiniciar la contraseña
   * @param code
   */
  const verifyResetPasswordCode = async (code: string) => {
    try {
      return await firebase.auth().verifyPasswordResetCode(code);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Función para crear la nueva contraseña
   * @param code El código de confirmación enviado al correo del usuario
   * @param password The new Password
   */
  const confirmPasswordReset = async (code: string, password: string) => {
    try {
      await firebase.auth().confirmPasswordReset(code, password);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  });

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    verifyResetPasswordCode,
    confirmPasswordReset
  };
}
