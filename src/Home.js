import React, { useContext } from "react";
import Lists from "./Lists";
import Form from "./Form";
import { AppContext } from "./App";

function Home() {
  const { lists, setLists } = useContext(AppContext);

  return (
    <>
      <Form />
      {lists.length > 0 && <Lists />}
      {lists.length > 0 && (
        <button
          type="button"
          className="standard-btn remove-btn"
          onClick={() => setLists([])}
        >
          Remove all lists
        </button>
      )}
    </>
  );
}

export default Home;
