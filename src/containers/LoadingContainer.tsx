import React from "react";
import { useLoading } from "@/hooks/useLoading";
import Loader from "@/components/Loader";

function LoadingContainer() {
  const { loading } = useLoading();
  return loading ? (
    <div className="loading-state">
      <Loader />
    </div>
  ) : null;
}

export default LoadingContainer;
