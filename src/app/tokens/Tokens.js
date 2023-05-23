import { fetchApi } from "@/utils/http";
import TokensTable from "@/components/table/specific/TokensTable";

const TopPools = async ({ ...rest }) => {
  const data = await fetchApi("/tokens/");
  const { results } = data;
  return <TokensTable data={results} {...rest} />;
};

export default TopPools;
