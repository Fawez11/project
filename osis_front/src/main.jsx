import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import "./index.css";
import ToggleContext from "./context/ToggleContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToggleContext>
      <RouterProvider router={router} />
    </ToggleContext>
  </StrictMode>
);
