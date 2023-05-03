import PrimaryButton from '@/components/button/PrimaryButton';
import MiningCard from '@/components/card/MiningCard';
import { useState } from 'react';
import PoolsTable from './PoolsTable';


const TopPoolsSection = () => {
  return (
    <>
  <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
    <div className="flex flex-row justify-between items-center px-4">
      <h1 className=" py-9 text-xl md:text-1xl xl:text-2xl">
        Top Pools 
      </h1>
      <PrimaryButton title="View all" location="/pools/" />
    </div>
    <div>
      <PoolsTable />
    </div>
</section>
    </>
)};

export default TopPoolsSection;