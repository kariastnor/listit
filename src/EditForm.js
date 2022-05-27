import { AppContext } from "./App";
import { useContext, useEffect } from "react";

function EditForm({ customList, setEditMode }) {
  const { editListName, listName, setListName } = useContext(AppContext);

  useEffect(() => {
    setListName(customList.name);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleEdit(event) {
    event.preventDefault();
    setEditMode(false);
    editListName(customList.id, listName);
  }

  return (
    <form onSubmit={handleEdit}>
      <label htmlFor="editList">Update the name of the list</label>
      <div className="form-group">
        <input
          id="editList"
          type="text"
          value={listName}
          onChange={(event) => setListName(event.target.value)}
          autoComplete="off"
          autoFocus
        />
        <button type="submit">Update</button>
        <button
          type="button"
          onClick={() => {
            setEditMode(false);
            setListName("");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditForm;
