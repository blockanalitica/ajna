import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { Settings as DTSettings } from "luxon";
import Footer from "./Footer";
import Navbar from "./Navbar";

config.autoAddCss = false;

// Set default timezone here for server components
// Set default timezone to UTC
DTSettings.defaultZone = "utc";
DTSettings.defaultLocale = "en";

export const metadata = {
  title: "Ajna Info",
  description: "Ajna Info Dashboard from Block Analitica",
};

export const fetchCache = "default-no-store";
export const revalidate = 1;

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-80 px-4">
          <Navbar network={"asd"} />
          {children}
          <Footer />
        </div>
        <div id="ajna-portal"></div>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
