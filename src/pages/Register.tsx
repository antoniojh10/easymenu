import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import RegisterComponent, {
  RegisterInput
} from "@/components/RegisterComponent";

function Register(_props: RouteComponentProps) {
  const auth = useAuth();
  const register = (data: RegisterInput) => {
    console.log(data);
    auth.signup(data.email, data.password);
  };
  return <RegisterComponent sendRegisterData={register} />;
}

export default Register;
