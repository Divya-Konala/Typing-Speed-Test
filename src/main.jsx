import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TestModeContextProvider } from "./context/TestModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TestModeContextProvider>
      <App />
    </TestModeContextProvider>
  </React.StrictMode>
);
