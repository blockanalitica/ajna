import "@fortawesome/fontawesome-svg-core/styles.css";
import { useLocation } from "react-router-dom";
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
        {version === "v1" ? <Notice /> : null}
        <Outlet />
        <Footer />
      </div>
      <div id="ajna-portal"></div>
    </main>
  );
};

export default RootLayout;
