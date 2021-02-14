import React from "react";
import { Router, Redirect } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import PasswordRecovery from "@/pages/PasswordRecovery";

function AppRouter() {
  const { user } = useAuth();
  return (
    <Layout>
      <Router>
        <Home path="/" />
        {user ? (
          <>
            <Redirect from="/signin" to="/dashboard" noThrow />
            <Redirect from="/signup" to="/dashboard" noThrow />
            <Redirect from="/recover-password" to="/dashboard" noThrow />
            <Dashboard path="/dashboard" />
          </>
        ) : (
          <>
            <Redirect from="/dashboard" to="/sigin" noThrow />
            <Login path="/signin" />
            <Register path="/signup" />
            <PasswordRecovery path="/recover-password" />
          </>
        )}
        <NotFound default />
      </Router>
    </Layout>
  );
}

export default AppRouter;
