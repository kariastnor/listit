import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppContext } from "./App";
import { useContext } from "react";

function Lists() {
  const { lists, deleteList } = useContext(AppContext);

  return (
    <>
      {lists.map((list) => {
        return (
          <div className="lists" key={list.id}>
            <Link to={`/${list.name}`}>
              <p>{list.name}</p>
            </Link>
            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteList(list.id)}
            >
              <MdDelete />
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Lists;
