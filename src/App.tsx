import React from "react";
import { ProvideAuth } from "@/hooks/useAuth";
import Router from "@/router/Router";
import "@/App.css";

function App() {
  return (
    <ProvideAuth>
      <Router />
    </ProvideAuth>
  );
}

export default App;
