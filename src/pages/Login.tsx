import React, { useState } from "react";
import { RouteComponentProps, useParams, navigate } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import LoginComponent, { LoginInput } from "@/components/LoginComponent";

function Login(_props: RouteComponentProps) {
  const { signin } = useAuth();
  const params = useParams();
  const [loginError, setLoginError] = useState<undefined | string>(undefined);

  const login = async (data: LoginInput) => {
    const error = await signin(data.email, data.password);
    if (error) setLoginError(error.code);
    if (!error) navigate("/dashboard");
  };

  return (
    <LoginComponent
      sendLoginData={login}
      passwordChanged={
        params.passwordChanged ? params.passwordChanged : undefined
      }
      loginError={loginError}
    />
  );
}

export default Login;
