import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import Context from "../context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Context>
);
