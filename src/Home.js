import React, { useContext } from "react";
import Lists from "./Lists";
import Form from "./Form";
import { AppContext } from "./App";

function Home() {
  const { lists } = useContext(AppContext);

  return (
    <>
      <Form />
      {lists.length > 0 && <Lists />}
    </>
  );
}

export default Home;
