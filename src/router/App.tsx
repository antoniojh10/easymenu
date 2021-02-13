import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import "../App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Easy Menu</h1>
      </header>
      <Router>
        <Home path="/" />
      </Router>
    </div>
  );
}

export default App;
