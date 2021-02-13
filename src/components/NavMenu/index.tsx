import React from "react";
import { Link } from "@reach/router";

function NavMenu() {
  return (
    <nav className="navMenu">
      <Link to="/">Home</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
  );
}

export default NavMenu;
