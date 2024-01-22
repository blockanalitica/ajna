import "@fortawesome/fontawesome-svg-core/styles.css";
import { useLocation } from "react-router-dom";
import * as Sentry from "@sentry/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Notice from "./Notice";
import { Outlet } from "react-router-dom";
import { smartLocationParts } from "@/utils/url";

const RootLayout = () => {
  const location = useLocation();
  const { version } = smartLocationParts(location);

  return (
    <main>
      <div className="mx-auto max-w-80 px-4">
        <Navbar />
        {version !== "v4" ? <Notice /> : null}

        <Sentry.ErrorBoundary
          fallback={
            <div className="text-center mt-10">
              <h1 className="text-4xl">ERROR</h1>
              <p className="mt-10">Oops, it seems that something went wrong.</p>
            </div>
          }
        >
          <Outlet />
        </Sentry.ErrorBoundary>
        <Footer />
      </div>
      <div id="ajna-portal"></div>
    </main>
  );
};

export default RootLayout;
