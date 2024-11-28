import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@pages/ErrorPage/ErrorPage";
import LayoutPage from "@pages/LayoutPage/LayoutPage";

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
      {
        path: "specialist",
        element: (
          <ProtectedRoute>
            <SpecialistPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminPage />,
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/print", element: <PrintPage />, errorElement: <ErrorPage /> },
]);
