import { useContext } from "react";
import { AppContext } from "./context";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function CustomListHeading({ setEditMode }) {
  const { deleteList, customList } = useContext(AppContext);

  return (
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
  );
}

export default CustomListHeading;
