import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
