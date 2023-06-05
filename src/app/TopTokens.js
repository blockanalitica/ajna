import { useFetch } from "@/hooks.js";
import TokensTable from "@/components/table/specific/TokensTable";

const TopTokens = ({ ...rest }) => {
  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/tokens/", {
    p_size: 5,
    order: "-tvl",
    // days_ago: daysAgo,
  });
  if (error) {
    return <p>Failed to load data</p>;
  }
  let { results } = data;

  return (
    <TokensTable data={results} allowOrder={false} isLoading={isLoading} {...rest} />
  );
};

export default TopTokens;
