import React from "react";
import { Router } from "@reach/router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import PasswordRecovery from "@/pages/PasswordRecovery";
import "@/App.css";

function App() {
  return (
    <Layout>
      <Router>
        <Home path="/" />
        <Login path="/signin" />
        <Register path="/signup" />
        <PasswordRecovery path="/recover-password" />
        <NotFound default />
      </Router>
    </Layout>
  );
}

export default App;
