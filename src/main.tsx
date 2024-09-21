import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
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
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </BrowserRouter>
);
