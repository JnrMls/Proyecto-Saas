import Dashboard from "./components/Dashboard";
import DashboardConectado from "./components/DashboardConectado";

// Con VITE_USE_API=true se conecta al backend; si no, usa datos de prueba.
const USAR_API = import.meta.env.VITE_USE_API === "true";

export default function App() {
  return USAR_API ? <DashboardConectado /> : <Dashboard />;
}
