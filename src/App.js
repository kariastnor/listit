import Home from "./Home";
import SharedLayout from "./SharedLayout";
import { Routes, Route } from "react-router-dom";
import CustomList from "./CustomList";
import CreateForm from "./CreateForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="my-lists/:listName" element={<CustomList />} />
        <Route path="new-list" element={<CreateForm />} />
      </Route>
    </Routes>
  );
}

export default App;
