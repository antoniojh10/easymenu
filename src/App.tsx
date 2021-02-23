import React from "react";
import { ProvideAuth } from "@/hooks/useAuth";
import { ProvideLoading } from "@/hooks/useLoading";
import Router from "@/router/Router";
import "@/App.css";

function App() {
  return (
    <ProvideLoading>
      <ProvideAuth>
        <Router />
      </ProvideAuth>
    </ProvideLoading>
  );
}

export default App;
