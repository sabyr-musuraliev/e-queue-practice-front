import { StoreProvider } from "./Providers/Store/StoreProvider";
import { RoutesProvider } from "./Providers/Router/RoutesProvider";
import "react-perfect-scrollbar/dist/css/styles.css";

function App() {
  return (
    <StoreProvider>
      <RoutesProvider />
    </StoreProvider>
  );
}

export default App;
