"use client";

import { useFetch } from "@/hooks";
import TokensTable from "@/components/table/specific/TokensTable";
import Button from "@/components/button/Button";
import { useParams } from "next/navigation";

const TopTokens = ({ daysAgo, ...rest }) => {
  const { network } = useParams();
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
  let { results, count = 0 } = data;

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Tokens</h1>
        <Button text={`View all (${count})`} href={`/${network}/tokens`} />
      </div>
      <TokensTable
        data={results}
        allowOrder={false}
        isLoading={isLoading}
        placeholderRows={5}
        {...rest}
      />
    </>
  );
};

export default TopTokens;
