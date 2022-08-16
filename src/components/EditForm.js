import { AppContext } from "../context";
import { useContext, useEffect } from "react";

function EditForm({ setEditMode }) {
  const { editListName, listName, setListName, customList } =
    useContext(AppContext);

  // On initial render, set the listName to the current customList name, and use the listName in the input field value.
  // This way the name will display in the input field to then be edited.
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
