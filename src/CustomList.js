import { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function CustomList() {
  const { lists } = useContext(AppContext);
  const { listName } = useParams();
  const customList = lists.find((list) => list.name === listName);
  const [items, setItems] = useState(getLocalStorageCustom());
  const [newItem, setNewItem] = useState("");

  // First check if there's a local list stored on computer
  function getLocalStorageCustom() {
    let storedList = localStorage.getItem(
      `${customList.name}_custom_list_220523zx`
    );
    if (storedList) {
      // Need to convert back from string to object
      return JSON.parse(storedList);
    } else {
      return [];
    }
  }

  useEffect(() => {
    localStorage.setItem(
      `${customList.name}_custom_list_220523zx`,
      JSON.stringify(items)
    );
  }, [items, customList]);

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

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }

  return (
    <>
      <div className="lists custom-lists">
        <h3>{customList.name}</h3>
      </div>
      <form onSubmit={handleCustomSubmit}>
        <label htmlFor="newItem">Add a new item to list</label>
        <div className="form-group">
          <input
            id="newItem"
            type="text"
            // placeholder="Enter a name for the list"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
          <button type="submit">Add</button>
        </div>
      </form>
      {items.length > 0 &&
        items.map((item) => {
          return (
            <div className="lists" key={item.id}>
              <p>{item.name}</p>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteItem(item.id)}
              >
                <MdDelete />
              </button>
            </div>
          );
        })}
    </>
  );
}

export default CustomList;
