import { Footer, Navbar } from '@/components';
import { AnalyticSection, PoolsSection } from '@/sections';

const navigation_app = [
    { name: 'Pools', href: '/pools', current: true },
    { name: 'Grants', href: '#', current: false },
    { name: 'Tokens', href: '#', current: false },
    { name: 'Auctions', href: '#', current: false },
  ]

const Pools = () => {
    return (
      <div className="bg-black overflow-hidden">
        <Navbar navigation={navigation_app}/>
        <h1 className="text-white">Pools</h1>
        <AnalyticSection />
        <PoolsSection />
        <Footer />
      </div>
    );
};

export default Pools;