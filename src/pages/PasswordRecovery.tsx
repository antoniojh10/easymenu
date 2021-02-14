import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import PasswordRecoveryComponent from "@/components/PasswordRecoveryComponent";

function PasswordRecovery(_props: RouteComponentProps) {
  const { sendPasswordResetEmail } = useAuth();
  const sendEmail = async (email: string) => {
    console.log(email);
    const response = await sendPasswordResetEmail(email);
    console.log(response);
  };
  return <PasswordRecoveryComponent sendEmail={sendEmail} />;
}

export default PasswordRecovery;
