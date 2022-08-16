import React, { useContext } from "react";
import { AppContext } from "../context";
import { MdDelete } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

function ListItem({ item }) {
  const {
    itemEditId,
    itemEditName,
    setItemEditId,
    setItemEditName,
    deleteItem,
    editItem,
  } = useContext(AppContext);

  return (
    <div className="list list-item">
      {item.id !== itemEditId ? (
        <p>{item.name}</p>
      ) : (
        <input
          type="text"
          value={itemEditName}
          onChange={(event) => {
            setItemEditName(event.target.value);
          }}
          autoComplete="off"
          autoFocus
        />
      )}
      {item.id !== itemEditId ? (
        <div className="item-btns">
          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              setItemEditId(item.id);
              setItemEditName(item.name);
            }}
          >
            <FaEdit />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => deleteItem(item.id)}
          >
            <MdDelete />
          </button>
        </div>
      ) : (
        <div className="item-btns">
          <button type="button" className="icon-btn" onClick={() => editItem()}>
            <IoIosSave />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              setItemEditId(null);
              setItemEditName("");
            }}
          >
            <MdOutlineCancel />
          </button>
        </div>
      )}
    </div>
  );
}

export default ListItem;
