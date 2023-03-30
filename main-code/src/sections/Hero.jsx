import MiningCard from '@/components/card/MiningCard';
import styles from '../styles';

const Hero = () => (
    <>
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">PERMISSIONLESS</span> LENDING POOLS
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Ajna’s protocol is a non-custodial, peer-to-peer, permissionless lending, borrowing and trading system that requires no governance or external price feeds to function. 
            The protocol consists of <span className="text-purple-500">pools</span> with lenders and borrowers.
            </p>
          <button href="#" className="rounded-full bg-purple inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Market Pools
          </button>
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Whitepaper
          </a> 
      </div>
      <div className=" lg:col-span-5 lg:flex">
        <MiningCard />
      </div>                
  </div>
</section>
    </>
);

export default Hero;