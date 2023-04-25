import PrimaryButton from '@/components/button/PrimaryButton';
import MiningCard from '@/components/card/MiningCard';
import SearchBar from '@/components/SearchInput/Search';

const Hero = () => (
    <>
  <section className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
    <div className="grid lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
          <div className='flex flex-row'>
            <h4 className="mb-4 text-ajna-lavender font-syncopate text-2xl font-bold tracking-tight text-gray-90">
              defi 
            </h4>
            <div className="h-1 w-10 m-3 rounded-md bg-gradient-to-r from-[#6f9493] via-[#493d76] to-ajna-spectrum-to" />
          </div>
          <h1 className="max-w-2xl py-5 leading-20 xl:leading-20 mb-4 text-4xl  tracking-tight md:text-5xl xl:text-6xl">
            <span className="font-extrabold leading-5 lg:leading-10 text-transparent bg-clip-text bg-gradient-to-r from-ajna-spectrum-from via-ajna-spectrum-via to-ajna-spectrum-to">PERMISSIONLESS</span> LENDING POOLS
          </h1>
          <p className="max-w-xl mb-10 py-3 leading-5 lg:leading-8 font-light lg:mb-8 md:text-lg lg:text-lg">
          Ajna’s protocol is a non-custodial, peer-to-peer, permissionless lending, borrowing and trading system that requires no governance or external price feeds to function. 
            The protocol consists of <span className="text-purple-7">pools</span> with lenders and borrowers.
            </p>
          <div className="py-7">
            <PrimaryButton title="Market Pools" location="/pools" />
            <a href="#" className="inline-flex items-center justify-center px-9 py-3 text-lg font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Whitepaper
            </a>             
          </div>

      </div>
      <div className=" lg:col-span-5 px-10 lg:flex">
        <MiningCard />
      </div> 
    </div>
    <div className="py-10">
      <SearchBar />
    </div>
</section>
    </>
);

export default Hero;