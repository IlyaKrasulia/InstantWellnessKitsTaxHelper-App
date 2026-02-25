import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";
import { AppLayout } from "./components/AppLayout";
import { ImportCSVScreen } from "./pages/mainStack/ImportCSV";
import { OrdersList } from "./pages/mainStack/ordersList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppLayout
      title="Orders History"
      info="Manage and review all processed transactions and their tax calculations."
    >
      <OrdersList />
    </AppLayout>
  </StrictMode>
);
