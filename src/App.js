import React, { useEffect, useState } from "react";
import Home from "./Home";
import SharedLayout from "./SharedLayout";
import { Routes, Route, useNavigate } from "react-router-dom";
import CustomList from "./CustomList";
import Form from "./Form";
import _ from "lodash";

// First check if there's a local list stored on computer
function getLocalStorage() {
  let storedList = localStorage.getItem("list_of_custom_lists_220523zy");
  if (storedList) {
    // Need to convert back from string to object
    return JSON.parse(storedList);
  } else {
    return [];
  }
}

const AppContext = React.createContext();

// SAVE TO LOCAL STORAGE AFTER FIRST CHECKING

function App() {
  const [lists, setLists] = useState(getLocalStorage());
  const [newList, setNewList] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "list_of_custom_lists_220523zy",
      JSON.stringify(lists)
    );
  }, [lists]);

  function handleSubmit(event) {
    event.preventDefault();
    if (newList) {
      document.getElementById("newList").className = "";
      setLists((prevLists) => {
        return [
          ...prevLists,
          {
            name: newList,
            id: new Date().getTime().toString(),
          },
        ];
      });
      setNewList("");
      navigate(`/${_.kebabCase(newList)}`);
    } else {
      document.getElementById("newList").classList.add("error");
    }
  }

  function deleteList(id) {
    setLists((prevLists) => {
      return prevLists.filter((list) => list.id !== id);
    });
  }
  return (
    <AppContext.Provider
      value={{ lists, setLists, newList, setNewList, handleSubmit, deleteList }}
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path=":listName" element={<CustomList />} />
          <Route path="new-list" element={<Form />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
export { AppContext };
