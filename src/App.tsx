import { Route, Routes } from "react-router-dom";
import { Context } from "./context/context";
import { Store } from "./pages/Store";
import { Authentication } from "./pages/Authentication";

function App() {
  const { userAuthenticated } = Context();

  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
      {userAuthenticated && (
        <>
          <Route path="/" element={<Store />} />
        </>
      )}
    </Routes>
  );
}

export default App;
