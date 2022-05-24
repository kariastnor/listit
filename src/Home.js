import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Lists from "./Lists";
import { AppContext } from "./App";

function Home() {
  const { lists, setLists } = useContext(AppContext);

  return (
    <>
      <Link to="new-list">
        <button className="standard-btn center-btn" type="button">
          Create new list
        </button>
      </Link>
      {lists.length > 0 && <Lists />}
      {lists.length > 0 && (
        <button
          type="button"
          className="standard-btn center-btn"
          onClick={() => setLists([])}
        >
          Remove all lists
        </button>
      )}
    </>
  );
}

export default Home;
