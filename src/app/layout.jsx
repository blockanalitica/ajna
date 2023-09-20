import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Notice from "./Notice";
import { Outlet } from "react-router-dom";

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
    </main>
  );
};

export default RootLayout;
