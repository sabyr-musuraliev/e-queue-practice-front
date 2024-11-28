import { StoreProvider } from "./Providers/Store/StoreProvider";
import { RoutesProvider } from "./Providers/Router/RouterProvider";

function App() {
  return (
    <StoreProvider>
      <RoutesProvider />
    </StoreProvider>
  );
}

export default App;
