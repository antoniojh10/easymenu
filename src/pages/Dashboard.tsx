import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";

function Dashboard(_props: RouteComponentProps) {
  const { user } = useAuth();
  return (
    <>
      <h1>Dashboard</h1>
      <p>{`${user?.firstName} ${user?.lastName}`}</p>
    </>
  );
}

export default Dashboard;
