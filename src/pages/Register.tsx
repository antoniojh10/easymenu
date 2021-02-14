import React from "react";
import { RouteComponentProps } from "@reach/router";
import RegisterComponent, {
  RegisterInput
} from "@/components/RegisterComponent";

function Register(_props: RouteComponentProps) {
  const register = (data: RegisterInput) => {
    console.log(data);
  };
  return <RegisterComponent sendRegisterData={register} />;
}

export default Register;
