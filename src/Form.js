import { AppContext } from "./App";
import { useContext } from "react";

function Form() {
  const { handleSubmit, newList, setNewList } = useContext(AppContext);
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newList">Create a new list</label>
      <div className="form-group">
        <input
          id="newList"
          type="text"
          placeholder="Enter a name for the list"
          value={newList}
          onChange={(event) => setNewList(event.target.value)}
          autoComplete="off"
        />
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default Form;
