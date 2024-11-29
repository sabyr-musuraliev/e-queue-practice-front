import { RouterProvider } from "react-router";
import { router } from "./routes.jsx";

export const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};
