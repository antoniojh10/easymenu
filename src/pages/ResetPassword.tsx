import React, { useState, useEffect } from "react";
import { RouteComponentProps, useLocation, navigate } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import ResetPasswordComponent, {
  ResetPasswordInput
} from "@/components/ResetPasswordComponent";

function ResetPassword(_props: RouteComponentProps) {
  const location = useLocation();
  const [code, setCode] = useState<string | undefined>(undefined);
  const auth = useAuth();

  useEffect(() => {
    async function verifyCode(code: string) {
      const response = await auth.verifyResetPasswordCode(code);
      if (response && response.length > 0) setCode(code);
    }

    if (location.search.includes("oobCode") && code === undefined) {
      const searchSplited: string[] = location.search.split("&");
      const oobCode = searchSplited[1].split("=")[1];
      verifyCode(oobCode);
    }
  }, [location.search]);

  const resetPassword = async (data: ResetPasswordInput) => {
    if (code === undefined) {
      console.error("Ha ocurrido un error al verificar el código.");
    } else {
      const response = await auth.confirmPasswordReset(
        code as string,
        data.password
      );
      if (response) navigate("/signin/true");
    }
  };
  return (
    <ResetPasswordComponent
      resetPassword={resetPassword}
      code={code ? code : undefined}
    />
  );
}

export default ResetPassword;
