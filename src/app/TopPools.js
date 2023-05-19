"use client";
import Button from "@/components/button/Button";
import PoolsTable from "./PoolsTable";

const TopPools = ({ ...rest }) => {
  return (
    <section {...rest}>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Pools</h1>
        <Button text="View all" href="/pools" />
      </div>
      <PoolsTable />
    </section>
  );
};

export default TopPools;
