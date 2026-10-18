import { AppProvider } from "@/providers/app.provider";
import { AppRouter } from "@/app/router";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
