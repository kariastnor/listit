import { useEffect, useContext } from "react";
import { AppContext } from "./context";

function Warning() {
  const { warning, setWarning, undo } = useContext(AppContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWarning({ boolean: false, name: "" });
    }, 5000);
    return () => clearTimeout(timeout);
  }, [warning, setWarning]);

  return (
    <div className="list warning">
      <p>"{warning.name}" has been deleted</p>
      <button
        type="button"
        onClick={() => {
          undo();
          setWarning({ boolean: false, name: "" });
        }}
      >
        Undo
      </button>
    </div>
  );
}

export default Warning;
