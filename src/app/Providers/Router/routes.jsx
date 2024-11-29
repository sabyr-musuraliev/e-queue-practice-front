import { createBrowserRouter } from "react-router";
import ErrorPage from "@pages/ErrorPage/ErrorPage";
import LayoutPage from "@pages/LayoutPage/LayoutPage";
import ProtectedRoute from "@shared/hoc/ProtectedRoutes";
import OperatorPage from "@pages/OperatorPage/OperatorPage";
import SpectatorPage from "@pages/SpectatorPage/SpectatorPage";
import LoginPage from "@pages/LoginPage/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "operator",
        element: (
          <ProtectedRoute>
            <OperatorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "spectator",
        element: (
          <ProtectedRoute>
            <SpectatorPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
