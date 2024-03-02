import AppRoutes from "./routes/AppRoutes";
import { AccommodationProvider } from "./context/AccommodationContext";

function App() {
  return (
    <AccommodationProvider>
      <AppRoutes />
    </AccommodationProvider>
  );
}

export default App;
