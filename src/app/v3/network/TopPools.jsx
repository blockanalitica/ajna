import PoolsTable from "@/components/table/specific/PoolsTable";
import { useFetch } from "@/hooks";
import Button from "@/components/button/Button";

const TopPools = ({ daysAgo = 1, ...rest }) => {
  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/pools/", {
    p_size: 5,
    order: "-tvl",
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }
  let { results, count = 0 } = data;
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Pools</h1>
        <Button text={`View all (${count})`} to="pools" />
      </div>
      <PoolsTable
        data={results}
        allowOrder={false}
        isLoading={isLoading}
        placeholderRows={5}
        placeholderFooter={true}
        {...rest}
      />
    </>
  );
};

export default TopPools;
