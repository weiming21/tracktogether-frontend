import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./store/AuthContext";
import { FilterContextProvider } from "./store/FilterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
