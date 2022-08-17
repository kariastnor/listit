import { AppContext } from "../context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";
import { useState } from "react";

function Form() {
  const { handleListSubmit, listName, setListName } = useContext(AppContext);
  const navigate = useNavigate();

  const [showWarning, setShowWarning] = useState(false);

  return (
    <form onSubmit={handleListSubmit}>
      <div className="create-form-heading">
        <label htmlFor="listName">Create a new list</label>
        <button
          type="button"
          className="warning-btn"
          onMouseOver={() => setShowWarning(true)}
          onMouseLeave={() => setShowWarning(false)}
          onClick={() => setShowWarning(!showWarning)}
        >
          <IoWarningOutline />
        </button>
      </div>
      <div
        className={showWarning ? "security-warning" : "security-warning hidden"}
      >
        <p>Don't store any sensitive data like passwords on this site</p>
      </div>

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
        <div className="btn-group">
          <button type="submit">Create</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
