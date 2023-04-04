import { Footer, Navbar } from "@/components";
import { AnalyticSection, GraphSection, SearchSection } from '@/sections';


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
        <AnalyticSection />
        <Footer />
      </div>
    );
};

export default Coins;