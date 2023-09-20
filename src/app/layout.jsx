// import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import { Analytics } from "@vercel/analytics/react";
// import Script from "next/script";
// import { Settings as DTSettings } from "luxon";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Notice from "./Notice";
import { Routes, Route, Outlet, Link } from "react-router-dom";

// config.autoAddCss = false;

// Set default timezone here for server components
// Set default timezone to UTC
// DTSettings.defaultZone = "utc";
// DTSettings.defaultLocale = "en";

// export const metadata = {
//   title: "Ajna Info",
//   description: "Ajna Info Dashboard from Block Analitica",
// };
//
// export const fetchCache = "default-no-store";
// export const revalidate = 1;

const RootLayout = () => {
  return (
    <main>
      <div className="mx-auto max-w-80 px-4">
        <Navbar />
        <Notice />
        <Outlet />
        <Footer />
      </div>
      <div id="ajna-portal"></div>
      {/* <Analytics /> */}
      {/* {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? ( */}
      {/*   <> */}
      {/*     <Script */}
      {/*       async */}
      {/*       defer */}
      {/*       data-hostname="ajna.blockanalitica.com" */}
      {/*       src="https://scripts.simpleanalyticscdn.com/latest.js" */}
      {/*     /> */}
      {/*     <noscript> */}
      {/*       {/* eslint-disable @next/next/no-img-element */} 
      {/*       <img */}
      {/*         src="https://queue.simpleanalyticscdn.com/noscript.gif?hostname=ajna.blockanalitica.com" */}
      {/*         alt="" */}
      {/*         referrerpolicy="no-referrer-when-downgrade" */}
      {/*       /> */}
      {/*     </noscript> */}
      {/*   </> */}
      {/* ) : null} */}
    </main>
  );
};

export default RootLayout;
