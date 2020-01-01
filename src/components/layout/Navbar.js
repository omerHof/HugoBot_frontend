import React from "react";
import { Link } from "react-router-dom";
import SignedOutLinks from "./SignedOutLinks.js";

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <center>
        <div className="container">
          <Link to="/" className="brand-logo">
            hugobot
          </Link>
          <SignedOutLinks />
        </div>
      </center>
    </nav>
  );
};

export default Navbar;
