import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";
import { AppLayout } from "./components/AppLayout";
import { CreateManualOrder } from "./pages/mainStack/CreateManualOrder";
import { ImportCSVScreen } from "./pages/mainStack/ImportCSV";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    {/* Import CSV Flow */}

    {/* <AppLayout
      title="Import Orders"
      info="Upload your sales data to calculate taxes and generate reports automatically."
    >
      <ImportCSVScreen />
    </AppLayout> */}

    <AppLayout
      title="Create Order Manually"
      info="Enter the location coordinates and order amount to calculate taxes and save the entry."
    >
      <CreateManualOrder />
    </AppLayout>
  </StrictMode>,
);
