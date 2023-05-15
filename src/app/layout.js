import { Settings as DTSettings } from "luxon";
import Navbar from "./Navbar";
import "@/styles/globals.css";

// Set default timezone to UTC
DTSettings.defaultZone = "utc";
DTSettings.defaultLocale = "en";

export const metadata = {
  title: "Ajna | Block Analitica",
  description: "Ajna Dashboard from Block Analitica",
};

export const fetchCache = 'default-no-store';
export const revalidate = 1;

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-80">
          <Navbar />
          
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
