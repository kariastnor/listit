import { useEffect, useContext } from "react";
import { AppContext } from "../context";

function Warning({ type }) {
  const { warning, setWarning, undo, itemUndo } = useContext(AppContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWarning({ boolean: false, name: "" });
    }, 4000);
    return () => clearTimeout(timeout);

    // eslint-disable-next-line
  }, [warning]);

  return (
    <div className="list warning">
      <p>{warning.name} been deleted</p>
      <button
        type="button"
        onClick={() => {
          // Use undo function from useUndoable package. Same function for items but renamed since they can't have the same name.
          if (type === "list") {
            undo();
          } else {
            itemUndo();
          }
          setWarning({ boolean: false, name: "" });
        }}
      >
        Undo
      </button>
    </div>
  );
}

export default Warning;
