import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};
