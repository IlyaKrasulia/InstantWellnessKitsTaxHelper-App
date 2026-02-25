import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";
import { AppLayout } from "./components/AppLayout";
import { ImportCSVScreen } from "./pages/mainStack/ImportCSV";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppLayout
      title="Import Orders"
      info="Upload your sales data to calculate taxes and generate reports automatically."
    >
      <ImportCSVScreen />
    </AppLayout>
  </StrictMode>,
);
