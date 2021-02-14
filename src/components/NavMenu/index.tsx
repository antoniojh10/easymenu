import React from "react";
import { Link } from "@reach/router";
import { useAuth } from "@/hooks/useAuth";

function NavMenu() {
  const { user, signout } = useAuth();
  return (
    <nav className="navMenu">
      <Link to="/">Home</Link>
      {user ? (
        <a onClick={signout}>Sign Out</a>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default NavMenu;
