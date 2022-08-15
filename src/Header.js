import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Yourganiser</h1>
      </Link>
      <Link to="/" className="standard-btn">
        Home
      </Link>
    </header>
  );
}

export default Header;
