import Home from "./Home";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import CustomList from "./CustomList";
import CreateForm from "./CreateForm";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="my-lists/:listNm" element={<CustomList />} />
          <Route path="new-list" element={<CreateForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
