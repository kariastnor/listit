import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppContext } from "../context";
import { useContext } from "react";
import _ from "lodash";

function Lists() {
  const { lists, deleteList } = useContext(AppContext);

  return (
    <>
      {lists.map((list) => {
        return (
          <div className="list" key={list.id}>
            <Link to={`/my-lists/${_.kebabCase(list.name)}`}>{list.name}</Link>
            <button
              type="button"
              className="icon-btn"
              onClick={() => {
                deleteList(list.id, list.name);
              }}
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
