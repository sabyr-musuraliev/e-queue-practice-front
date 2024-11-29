import { StoreProvider } from "./Providers/Store/StoreProvider";
import { RoutesProvider } from "./Providers/Router/RoutesProvider";

function App() {
  return (
    <StoreProvider>
      <RoutesProvider />
    </StoreProvider>
  );
}

export default App;
