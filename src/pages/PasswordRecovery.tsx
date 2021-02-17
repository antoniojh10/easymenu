import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import PasswordRecoveryComponent from "@/components/PasswordRecoveryComponent";

function PasswordRecovery(_props: RouteComponentProps) {
  const { sendPasswordResetEmail } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState<Boolean>(false);
  const [recoveryError, setRecoveryError] = useState<undefined | string>(
    undefined
  );
  const sendEmail = async (email: string) => {
    console.log(email);
    const error = await sendPasswordResetEmail(email);
    if (error) setRecoveryError(error.code);
    if (!error) setShowSuccessMessage(true);
  };
  return (
    <PasswordRecoveryComponent
      sendEmail={sendEmail}
      recoveryError={recoveryError}
      showMessage={showSuccessMessage}
    />
  );
}

export default PasswordRecovery;
