type ErrorObject = {
  [errorCode: string]: string;
};

const getErrorMessage: ErrorObject = {
  // Login errors
  "login/auth/user-not-found":
    "El nombre de usuario o correo no se encuentra registrado.",
  "login/auth/wrong-password": "La contraseña es incorrecta.",
  // Register errors
  "register/auth/email-already-in-use":
    "El correo que intenta usar ya se encuentra registrado.",
  "register/auth/username-already-in-use":
    "El nombre de usuario que intenta usar ya se encuentra registrado.",
  // Recover Password errors
  "recover-password/auth/user-not-found":
    "El nombre de usuario o correo no se encuentra registrado."
};

export default getErrorMessage;
