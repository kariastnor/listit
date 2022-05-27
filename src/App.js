import React, { useEffect, useState } from "react";
import useUndoable from "use-undoable";
import Home from "./Home";
import SharedLayout from "./SharedLayout";
import { Routes, Route, useNavigate } from "react-router-dom";
import CustomList from "./CustomList";
import CreateForm from "./CreateForm";
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
  // const [lists, setLists] = useState(getLocalStorage());
  const [lists, setLists, { undo }] = useUndoable(getLocalStorage());
  const [listName, setListName] = useState("");
  const [warning, setWarning] = useState({ boolean: false, name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "list_of_custom_lists_220523zy",
      JSON.stringify(lists)
    );
  }, [lists]);

  function handleSubmit(event) {
    event.preventDefault();
    if (listName) {
      document.getElementById("listName").className = "";
      setLists((prevLists) => {
        return [
          ...prevLists,
          {
            name: listName,
            id: new Date().getTime().toString(),
          },
        ];
      });
      setListName("");
      navigate(`/my-lists/${_.kebabCase(listName)}`);
    } else {
      document.getElementById("listName").classList.add("error");
    }
  }

  function deleteList(id, name) {
    setLists((prevLists) => {
      return prevLists.filter((list) => list.id !== id);
    });
    setWarning({ boolean: true, name: name });
    navigate("/");
  }

  function editListName(id, newName) {
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id === id) {
          return { ...list, name: newName };
        } else {
          return list;
        }
      });
    });
    navigate(`/my-lists/${_.kebabCase(newName)}`);
    setListName("");
  }

  return (
    <AppContext.Provider
      value={{
        lists,
        setLists,
        undo,
        listName,
        setListName,
        warning,
        setWarning,
        handleSubmit,
        deleteList,
        editListName,
      }}
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="my-lists/:listName" element={<CustomList />} />
          <Route path="new-list" element={<CreateForm />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
export { AppContext };
