import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Lists from "./Lists";
import { AppContext } from "./context";
import Warning from "./Warning";

function Home() {
  const { lists, setLists, warning, setWarning } = useContext(AppContext);

  return (
    <>
      <Link to="new-list" className="standard-btn center-btn">
        Create new list
      </Link>
      {warning.boolean && <Warning />}
      {lists.length > 0 && <Lists />}
      {lists.length > 0 && (
        <button
          type="button"
          className="standard-btn center-btn"
          onClick={() => {
            setLists([]);
            setWarning({ boolean: true, name: "All lists have" });
          }}
        >
          Remove all lists
        </button>
      )}
    </>
  );
}

export default Home;
