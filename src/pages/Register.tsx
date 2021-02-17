import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import RegisterComponent, {
  RegisterInput
} from "@/components/RegisterComponent";

function Register(_props: RouteComponentProps) {
  const auth = useAuth();
  const [registerError, setRegisterError] = useState<undefined | string>(
    undefined
  );
  const register = async (data: RegisterInput) => {
    console.log(data);
    const error = await auth.signup({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password
    });
    if (error) setRegisterError(error.code);
  };
  return (
    <RegisterComponent
      sendRegisterData={register}
      registerError={registerError}
    />
  );
}

export default Register;
