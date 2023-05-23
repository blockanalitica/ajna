import { fetchApi } from "@/utils/http";
import PoolsTable from "@/components/table/specific/PoolsTable";

const TopPools = async ({ ...rest }) => {
  const data = await fetchApi("/pools/");
  const { results } = data;
  return <PoolsTable data={results} {...rest} />;
};

export default TopPools;
