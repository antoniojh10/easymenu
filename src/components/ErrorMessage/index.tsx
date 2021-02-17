import React from "react";
import getErrorMessage from "@/utils/getErrorMessage";

type ErrorMessageProps = {
  prefix: string;
  errorCode: undefined | string;
};

function ErrorMessage({ prefix, errorCode }: ErrorMessageProps) {
  return errorCode ? (
    <span role="alarm">{getErrorMessage[`${prefix}/${errorCode}`]}</span>
  ) : null;
}

export default ErrorMessage;
