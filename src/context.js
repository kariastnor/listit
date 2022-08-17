import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUndoable from "use-undoable";
import _ from "lodash";

// First check if there's a local list of lists stored on computer
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

function AppProvider({ children }) {
  // States for home page (i.e. list of lists)
  const [lists, setLists, { undo }] = useUndoable(getLocalStorage());
  const [listName, setListName] = useState("");
  const [warning, setWarning] = useState({ boolean: false, name: "" });

  // States for individual lists
  const [customList, setCustomList] = useState("");
  const [items, setItems, { undo: itemUndo }] = useUndoable([]);
  const [newItem, setNewItem] = useState("");
  const [itemEditId, setItemEditId] = useState(null);
  const [itemEditName, setItemEditName] = useState("");

  const navigate = useNavigate();

  // Whenever the list of lists is updated, update the local storage
  useEffect(() => {
    localStorage.setItem(
      "list_of_custom_lists_220523zy",
      JSON.stringify(lists)
    );
  }, [lists]);

  // #################################
  // HOME PAGE FUNCTIONS (i.e. for handling the list of lists)

  // Handle submit for new list. If listName input field is not true, i.e. empty, add error formatting.
  // Otherwise, add new list to the list of lists and navigate to new list.
  function handleListSubmit(event) {
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
    setWarning({ boolean: true, name: `${name} has` });
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

  // #################################
  // LIST ITEM FUNCTIONS (i.e. for handling the individual lists)

  // When the customList state changes, set the items state by first checking the local storage if this custom list already exists
  useEffect(() => {
    setItems(getLocalStorageCustom());
    // eslint-disable-next-line
  }, [customList]);

  // // Look for the custom list items already stored locally
  function getLocalStorageCustom() {
    let storedList = localStorage.getItem(
      `${customList.id}_custom_list_220523zx`
    );
    if (storedList) {
      // Need to convert back from string to object
      return JSON.parse(storedList);
    } else {
      return [];
    }
  }

  // Update the custom list items whenever there is a change to the items or the custom list
  useEffect(() => {
    localStorage.setItem(
      `${customList.id}_custom_list_220523zx`,
      JSON.stringify(items)
    );
  }, [items, customList]);

  // If item input field is empty on submit, add error styling. Otherwise add the new item to the items state.
  function handleCustomSubmit(event) {
    event.preventDefault();
    if (newItem) {
      document.getElementById("newItem").className = "";
      setItems((prevItems) => {
        return [
          ...prevItems,
          { name: newItem, id: new Date().getTime().toString() },
        ];
      });
      setNewItem("");
    } else {
      document.getElementById("newItem").classList.add("error");
    }
  }

  // For the item being edited, change the name to the itemEditName state (which is set directly in the component)
  // and then clear out the itemEditId/Name.
  function editItem() {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemEditId) {
          return { ...item, name: itemEditName };
        } else {
          return item;
        }
      });
    });
    setItemEditId(null);
    setItemEditName("");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }

  return (
    <AppContext.Provider
      value={{
        lists,
        setLists,
        undo,
        itemUndo,
        listName,
        setListName,
        warning,
        setWarning,
        handleListSubmit,
        deleteList,
        editListName,
        customList,
        setCustomList,
        items,
        setItems,
        handleCustomSubmit,
        newItem,
        setNewItem,
        itemEditId,
        setItemEditId,
        itemEditName,
        setItemEditName,
        deleteItem,
        editItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
