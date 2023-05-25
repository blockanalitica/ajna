import { fetchApi } from "@/utils/http";
import PoolsTable from "@/components/table/specific/PoolsTable";

const TopPools = async ({ ...rest }) => {
  const data = await fetchApi("/pools/", { order: "-tvl" });
  let { results } = data;
  results = results.slice(0, 5);
  return <PoolsTable data={results} allowOrder={false} {...rest} />;
};

export default TopPools;
