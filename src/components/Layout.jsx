import Footer from "./Footer";
import Navbar from "./Navbar";

const navigation_app = [
  { name: "Pools", href: "/pools", current: false },
  { name: "Tokens", href: "/tokens", current: false },
  { name: "Auctions", href: "/auctions", current: false },
  { name: "Grants", href: "#", current: false },
];

export default function Layout({ children }) {
  return (
    <div className="mx-auto max-w-9xl px-4">
      <Navbar navigation={navigation_app} />
      <div className="py-10">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
