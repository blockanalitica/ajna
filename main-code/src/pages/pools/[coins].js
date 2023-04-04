import { Footer, Navbar } from "@/components";
import { SearchSection } from "@/sections";
import { GraphSection } from "@/sections";

const navigation_app = [
    { name: 'Pools', href: '/pools', current: true },
    { name: 'Grants', href: '#', current: false },
    { name: 'Tokens', href: '#', current: false },
    { name: 'Auctions', href: '#', current: false },
  ]

const Coins = () => {
    return (
      <div className="bg-black overflow-hidden">
        <Navbar navigation={navigation_app}/>
        <SearchSection showMiddleButton={false} />
        <GraphSection />
        <Footer />
      </div>
    );
};

export default Coins;