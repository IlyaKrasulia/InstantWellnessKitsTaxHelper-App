import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "@/pages/auth/Login";
import { AppLayout } from "@/components/AppLayout";
import { ImportCSVPage } from "@/pages/mainStack/ImportCSV";
import { CreateManualOrder } from "@/pages/mainStack/CreateManualOrder";
import { RouteNames } from "@/utils/routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { ErrorPage } from "@/pages/mainStack/ErrorPage";
import { OrdersList } from "@/pages/mainStack/OrdersList/index.tsx";
import { OrderDetails } from "@/pages/mainStack/OrderDetails";
import { ImportsList } from "@/pages/mainStack/ImportsList";
import { ImportDetails } from "@/pages/mainStack/ImportDetails";

export const router = createBrowserRouter([
  {
    path: RouteNames.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: () => redirect(`/${RouteNames.IMPORT}`),
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: RouteNames.IMPORT,
            element: <ImportCSVPage />,
            handle: {
              title: "Import Data",
              info: "Upload your CSV files to process tax reports.",
            },
          },
          {
            path: RouteNames.CREATE,
            element: <CreateManualOrder />,
            handle: {
              title: "Create Manual Order",
              info: "Manually input order details to calculate taxes on the fly.",
            },
          },
          {
            path: RouteNames.ORDERS,
            element: <OrdersList />,
            handle: {
              title: "Orders History",
              info: "Manage and review all processed transactions and their tax calculations.",
            },
          },
          {
            path: RouteNames.ORDER_DETAILS,
            element: <OrderDetails />,
            handle: {
              title: "Order Details",
              info: "View detailed information and tax breakdown for a specific order.",
            },
          },
           {
            path: RouteNames.IMPORTS_LIST,
            element: <ImportsList />,
            handle: {
              title: "Imports List",
              info: "View and manage all imported data.",
            },
          },
          {
            path: RouteNames.IMPORT_DETAILS,
            element: <ImportDetails />,
            handle: {
              title: "Import Details",
              info: "View detailed information about a specific import.",
            },
          }
        ],
      },
    ],
  },
]);
