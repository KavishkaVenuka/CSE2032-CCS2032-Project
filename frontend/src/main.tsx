<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <React.StrictMode>

    </React.StrictMode>
)
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DarkModeProvider } from "./pages/student/darkmodecontext/DarkModeContext";
import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
>>>>>>> main
