import { config } from "@fortawesome/fontawesome-svg-core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Settings as DTSettings } from "luxon";
import AjnaRoutes from "@/routes";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;
axios.defaults.headers.common["Content-Type"] = "application/json";

config.autoAddCss = false;

// Set default timezone here for server components
// Set default timezone to UTC
DTSettings.defaultZone = "utc";
DTSettings.defaultLocale = "en";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AjnaRoutes />
    </QueryClientProvider>
  );
}

export default App;
