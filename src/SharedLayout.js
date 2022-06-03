import React from "react";
import { Link, Outlet } from "react-router-dom";

function SharedLayout() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Yourganiser</h1>
        </Link>
        <Link to="/" className="standard-btn">
          Home
        </Link>
      </header>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
}

export default SharedLayout;
