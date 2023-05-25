import { fetchApi } from "@/utils/http";
import TokensTable from "@/components/table/specific/TokensTable";

const TopTokens = async ({ ...rest }) => {
  const data = await fetchApi("/tokens/", { order: "-tvl" });
  let { results } = data;
  results = results.slice(0, 5);
  return <TokensTable data={results} allowOrder={false} {...rest} />;
};

export default TopTokens;
