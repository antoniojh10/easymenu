import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import LoginComponent, { LoginInput } from "@/components/LoginComponent";

function Login(_props: RouteComponentProps) {
  const { signin } = useAuth();
  const login = (data: LoginInput) => {
    console.log(data);
    signin(data.email, data.password);
  };
  return <LoginComponent sendLoginData={login} />;
}

export default Login;
