import React from "react";
import { RouteComponentProps } from "@reach/router";
import PasswordRecoveryComponent from "@/components/PasswordRecoveryComponent";

function PasswordRecovery(_props: RouteComponentProps) {
  const sendEmail = (email: string) => {
    console.log(email);
  };
  return <PasswordRecoveryComponent sendEmail={sendEmail} />;
}

export default PasswordRecovery;
