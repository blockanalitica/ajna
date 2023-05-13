import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { Settings as DTSettings } from "luxon";

// Set default timezone to UTC
DTSettings.defaultZone = "utc";
DTSettings.defaultLocale = "en";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
