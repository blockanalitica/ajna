import PrimaryButton from '@/components/button/PrimaryButton';
import MiningCard from '@/components/card/MiningCard';

const PoolsSection = () => (
    <>
  <section className={` sm:pl-16 pl-6`}>
    <div className="grid max-w-screen-2xl px-4 py-8 lg:py-16 ">
      <h1 className=" py-5 mb-4 text-xl md:text-1xl xl:text-2xl">
        Top Pools 
      </h1>
      
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <MiningCard />
      <MiningCard />
      <MiningCard />
      <MiningCard />
      <MiningCard />
      <MiningCard />
      <MiningCard />
      <MiningCard />
      <MiningCard />

      </div>                
    </div>
</section>
    </>
);

export default PoolsSection;