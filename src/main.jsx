import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MapFileContextProvider } from "./context/MapFileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MapFileContextProvider>
      <App />
    </MapFileContextProvider>
  </React.StrictMode>
);
