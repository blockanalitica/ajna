import { useFetch } from "@/hooks";
import PoolsTable from "@/components/table/specific/PoolsTable";

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
    <PoolsTable data={results} allowOrder={false} isLoading={isLoading} {...rest} />
  );
};

export default TopPools;
