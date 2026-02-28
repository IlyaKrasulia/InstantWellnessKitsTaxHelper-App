import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify"

import "./index.css";

import { router } from "./router/routes";
import { GlobalStyles } from "./utils/GlobalStyles";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
