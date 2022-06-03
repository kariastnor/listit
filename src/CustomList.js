import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import _ from "lodash";
import { FaEdit } from "react-icons/fa";
import EditForm from "./EditForm";
import ItemForm from "./ItemForm";

function CustomList() {
  const { lists, deleteList } = useContext(AppContext);
  const { listName } = useParams();
  const customList = lists.find((list) => _.kebabCase(list.name) === listName);

  const [items, setItems] = useState(getLocalStorageCustom());
  const [newItem, setNewItem] = useState("");
  const [editMode, setEditMode] = useState(false);

  // First check if there's a local list stored on computer
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

  useEffect(() => {
    localStorage.setItem(
      `${customList.id}_custom_list_220523zx`,
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
      {!editMode && (
        <div className="custom-list">
          <h3>{customList.name}</h3>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setEditMode(true)}
          >
            <FaEdit />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => deleteList(customList.id, customList.name)}
          >
            <MdDelete />
          </button>
        </div>
      )}
      {editMode && (
        <EditForm customList={customList} setEditMode={setEditMode} />
      )}
      <ItemForm
        handleCustomSubmit={handleCustomSubmit}
        newItem={newItem}
        setNewItem={setNewItem}
      />
      {items.length > 0 &&
        items.map((item) => {
          return (
            <div className="list list-item" key={item.id}>
              <p>{item.name}</p>
              <button
                type="button"
                className="icon-btn"
                onClick={() => deleteItem(item.id)}
              >
                <MdDelete />
              </button>
            </div>
          );
        })}
      {items.length > 0 && (
        <button
          type="button"
          className="standard-btn center-btn"
          onClick={() => setItems([])}
        >
          Remove all items
        </button>
      )}
    </>
  );
}

export default CustomList;
