import React, { useContext } from "react";
import { AppContext } from "../context";

function ItemForm() {
  const { handleCustomSubmit, newItem, setNewItem } = useContext(AppContext);

  return (
    <form onSubmit={handleCustomSubmit}>
      <label htmlFor="newItem">Add a new item to list</label>
      <div className="form-group">
        <input
          id="newItem"
          type="text"
          // placeholder="Enter a name for the list"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default ItemForm;
