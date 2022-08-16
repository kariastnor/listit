import { AppContext } from "../context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const { handleListSubmit, listName, setListName } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <form onSubmit={handleListSubmit}>
      <label htmlFor="listName">Create a new list</label>
      <div className="form-group">
        <input
          id="listName"
          type="text"
          placeholder="Enter a name for the list"
          value={listName}
          onChange={(event) => setListName(event.target.value)}
          autoComplete="off"
          autoFocus
        />
        <button type="submit">Create</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Form;
