import React from "react";
import ReactDOM from "react-dom/client";
import Controller from "./Controller";
import { ToastContainer, toast } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
// DucNh66 cấu hinhg toast
const toastConfig = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 1500,
};
root.render(
  <React.StrictMode>
    <Controller />
    <ToastContainer {...toastConfig} />
  </React.StrictMode>
);
