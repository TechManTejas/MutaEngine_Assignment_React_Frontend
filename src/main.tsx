import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MyContextProvider } from "./context/context.tsx";
import { BrowserRouter } from "react-router-dom";

declare global {
  interface Window {
    global: any;
  }
}

window.global ||= window;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <MyContextProvider>
        <App />
      </MyContextProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
