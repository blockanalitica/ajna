import { Footer, Navbar } from '@/components';
import { Hero } from '../sections';

const navigation_home = [
  { name: 'Pools', href: '/pools', current: false },
  { name: 'Grants', href: '#', current: false },
  { name: 'Docs', href: '#', current: false },
  { name: 'FAQ', href: '#', current: false },
]

const Home = () => (
  <div className="bg-black overflow-hidden">
    <Navbar navigation={navigation_home}/>
    <Hero />
    <Footer />
  </div>
);

export default Home;