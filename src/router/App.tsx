import React from "react";
import { Router } from "@reach/router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import "@/App.css";

function App() {
  return (
    <Layout>
      <Router>
        <Home path="/" />
        <Login path="/signin" />
        <Register path="/signup" />
      </Router>
    </Layout>
  );
}

export default App;
