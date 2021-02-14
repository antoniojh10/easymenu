import React from "react";
import { RouteComponentProps } from "@reach/router";
import LoginComponent, { LoginInput } from "@/components/LoginComponent";

function Login(_props: RouteComponentProps) {
  const login = (data: LoginInput) => {
    console.log(data);
  };
  return <LoginComponent sendLoginData={login} />;
}

export default Login;
