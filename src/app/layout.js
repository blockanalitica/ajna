import { config } from "@fortawesome/fontawesome-svg-core";
import { Settings as DTSettings } from "luxon";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/styles/globals.css";

config.autoAddCss = false;

// Set default timezone to UTC
DTSettings.defaultZone = "utc";
DTSettings.defaultLocale = "en";

export const metadata = {
  title: "Ajna | Block Analitica",
  description: "Ajna Dashboard from Block Analitica",
};

export const fetchCache = "default-no-store";
export const revalidate = 1;

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-80 px-4">
          <Navbar />
          {children}
          <Footer />
        </div>
        <div id="ajna-portal"></div>
      </body>
    </html>
  );
};

export default RootLayout;
