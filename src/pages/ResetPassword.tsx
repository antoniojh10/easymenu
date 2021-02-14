import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import ResetPasswordComponent, {
  ResetPasswordInput
} from "@/components/ResetPasswordComponent";

function ResetPassword(_props: RouteComponentProps) {
  const resetPassword = async (data: ResetPasswordInput) => {
    console.log(data);
  };
  return <ResetPasswordComponent resetPassword={resetPassword} />;
}

export default ResetPassword;
