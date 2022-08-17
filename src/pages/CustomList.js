import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context";
import _ from "lodash";
import EditForm from "../components/EditForm";
import ItemForm from "../components/ItemForm";
import CustomListHeading from "../components/CustomListHeading";
import ListItems from "../components/ListItems";
import Warning from "../components/Warning";

function CustomList() {
  const { lists, items, setItems, setCustomList, warning, setWarning } =
    useContext(AppContext);

  // State value used for conditional rendering of list heading or list edit view
  const [editMode, setEditMode] = useState(false);

  const { listNm } = useParams();

  // Set the customList state to the currently viewed list on initial render or
  // when the lists array is updated (to ensure that the customList name is also updated when the list name is edited)
  useEffect(() => {
    setCustomList(lists.find((list) => _.kebabCase(list.name) === listNm));
    // eslint-disable-next-line
  }, [lists]);

  return (
    <>
      {!editMode && <CustomListHeading setEditMode={setEditMode} />}
      {editMode && <EditForm setEditMode={setEditMode} />}
      <ItemForm />
      {warning.boolean && <Warning type="item" />}
      {items.length > 0 && <ListItems />}
      {items.length > 0 && (
        <button
          type="button"
          className="standard-btn center-btn"
          onClick={() => {
            setItems([]);
            setWarning({ boolean: true, name: "All items have" });
          }}
        >
          Remove all items
        </button>
      )}
    </>
  );
}

export default CustomList;
