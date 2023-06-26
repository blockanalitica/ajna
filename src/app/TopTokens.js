import { useFetch } from "@/hooks";
import TokensTable from "@/components/table/specific/TokensTable";

const TopTokens = ({ daysAgo, ...rest }) => {
  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/tokens/", {
    p_size: 5,
    order: "-tvl",
    days_ago: daysAgo,
  });
  if (error) {
    return <p>Failed to load data</p>;
  }
  let { results } = data;

  return (
    <TokensTable
      data={results}
      allowOrder={false}
      isLoading={isLoading}
      placeholderRows={5}
      {...rest}
    />
  );
};

export default TopTokens;
