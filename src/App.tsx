import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "./context/context";
import { Store } from "./pages/Store";
import { Authentication } from "./pages/Authentication";
import { ResetPassword } from "./pages/ResetPassword";
import { ForgotPassword } from "./pages/ForgotPassword";

function App() {
  const { userAuthenticated } = Context();

  return (
    <Routes>
    {/* Authenticated routes */}
    {userAuthenticated ? (
      <>
        <Route path="/" element={<Store />} />
        {/* Add more authenticated routes here */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    ) : (
      // Unauthenticated routes
      <>
        <Route path="/" element={<Authentication />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    )}
  </Routes>
  );
}

export default App;
