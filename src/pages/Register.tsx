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
    const error = await auth.signup(
      data.firstName,
      data.lastName,
      data.email,
      data.password
    );
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
