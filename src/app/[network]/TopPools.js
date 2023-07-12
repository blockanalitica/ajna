import PoolsTable from "@/components/table/specific/PoolsTable";
import { useFetch } from "@/hooks";

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
  let { results } = data;
  return (
    <PoolsTable
      data={results}
      allowOrder={false}
      isLoading={isLoading}
      placeholderRows={5}
      placeholderFooter={true}
      {...rest}
    />
  );
};

export default TopPools;