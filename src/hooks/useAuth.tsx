import React, { useState, useEffect, useContext } from "react";
import { useLoading, Loading } from "./useLoading";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import {
  uniqueUserName,
  registerNewUser,
  loginWithUserName,
  getUserData
} from "@/api/firebase";

export type Auth = {
  user: UserLoged | null;
  signup: (userData: RegisterUser) => Promise<Error | undefined>;
  signin: (
    emailOrUsername: string,
    password: string
  ) => Promise<undefined | Error>;
  signout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<undefined | Error>;
  verifyResetPasswordCode: (code: string) => Promise<string | undefined>;
  confirmPasswordReset: (
    code: string,
    password: string
  ) => Promise<Boolean | undefined>;
};

type RegisterUser = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type UserLoged = {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
};

export type Error = {
  code: string;
  message?: string;
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
  const [user, setUser] = useState<UserLoged | null>(null);
  const { loadingOn, loadingOff }: Loading = useLoading();

  /**
   * Función para iniciar sesión
   * @param emailOrUsername
   * @param password
   */
  const signin = async (emailOrUsername: string, password: string) => {
    if (emailOrUsername.includes("@")) {
      return signinWithEmailAndPassword(emailOrUsername, password);
    } else {
      return signinWithUsernameAndPassword(emailOrUsername, password);
    }
  };
  const signinWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      let userInfo = undefined;

      if (response.user?.email) {
        userInfo = await getUserData(response.user?.email);
      } else {
        throw { code: "auth/user-not-found" };
      }

      setUser({ ...userInfo });
    } catch (error) {
      console.error(error);
      return error as Error;
    }
  };
  const signinWithUsernameAndPassword = async (
    username: string,
    password: string
  ) => {
    try {
      const response: string | Error = await loginWithUserName(username);
      if (typeof response === "string") {
        return signinWithEmailAndPassword(response, password);
      } else {
        throw response;
      }
    } catch (error) {
      console.error(error);
      return error as Error;
    }
  };

  /**
   * Funcion para registro básico de usuarios
   * @param userData firstName, lastName, username, email, password
   */
  const signup = async (userData: RegisterUser) => {
    try {
      const usernameIsNotUnique: undefined | Error = await uniqueUserName(
        userData.username.toLowerCase()
      );
      if (usernameIsNotUnique) throw usernameIsNotUnique;
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password);

      if (!response.user?.uid) throw new Error("Ha ocurrido un error");

      const userBasic = {
        id: response.user?.uid,
        firstName: userData.firstName,
        username: userData.username.toLowerCase(),
        lastName: userData.lastName,
        email: userData.email
      };

      await registerNewUser(userBasic);
      setUser({ ...userBasic });
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
    loadingOff();
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async function (user: any) {
        if (user) {
          loadingOn();
          const userData = await getUserData(user.email);
          setUser({ ...userData });
          loadingOff();
        } else {
          setUser(null);
        }
      });

    return () => unsubscribe();
  }, [user?.email]);

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
