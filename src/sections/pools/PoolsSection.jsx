
import PoolsOptions from './PoolsOptions';
import PoolsTable from '@/components/table/specific/PoolsTable';
import MiningCard from '@/components/card/MiningCard';
import { useState } from 'react';
import TableCardViewIcon from '@/components/icon/TableCardViewIcon';

const PoolsSection = () => {
  const [showFirstDiv, setShowFirstDiv] = useState(true);

  const toggleDivs = () => {
    setShowFirstDiv(!showFirstDiv);
  };

  return (
    <>
  <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
    <div className="flex flex-row justify-between items-center px-4">
      <h1 className=" py-9 text-xl md:text-1xl xl:text-2xl">
        Top Pools 
      </h1>
      <PoolsOptions />
      <button onClick={toggleDivs}><TableCardViewIcon cardView={ showFirstDiv } /></button>
    </div>
    <div>
      {showFirstDiv ? (
          <PoolsTable />
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          <MiningCard />
          <MiningCard />
          <MiningCard />
          <MiningCard />
          <MiningCard />
          <MiningCard />
        </div>
      )}
    </div>
</section>
    </>
)};

export default PoolsSection;




