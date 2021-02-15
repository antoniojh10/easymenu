import React from "react";
import { RouteComponentProps, useParams, navigate } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import LoginComponent, { LoginInput } from "@/components/LoginComponent";

function Login(_props: RouteComponentProps) {
  const { signin } = useAuth();
  const params = useParams();
  const login = async (data: LoginInput) => {
    console.log(data);
    await signin(data.email, data.password);
    navigate("/dashboard");
  };
  return (
    <LoginComponent
      sendLoginData={login}
      passwordChanged={
        params.passwordChanged ? params.passwordChanged : undefined
      }
    />
  );
}

export default Login;
