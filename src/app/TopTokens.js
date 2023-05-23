import { fetchApi } from "@/utils/http";
import TokensTable from "@/components/table/specific/TokensTable";

const TopTokens = async ({ ...rest }) => {
  const data = await fetchApi("/tokens/");
  let { results } = data;
  results = results.slice(0, 5);
  return <TokensTable data={results} {...rest} />;
};

export default TopTokens;
