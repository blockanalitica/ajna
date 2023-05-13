import { useFetch } from "@/hooks.js";
import {
  BucketsSection,
  GraphSection,
  PoolStatsSection,
  SearchSection,
} from "@/sections";
import { useRouter } from "next/router";

const Pool = () => {
  const { query } = useRouter();
  const { poolAddress } = query;
  const { data, error, isLoading } = useFetch(`/pools/${poolAddress}/`);

  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const results = data.results;

  if (results) {
    return (
      <>
        <SearchSection showTimePicker={true} />
        <PoolStatsSection data={results} />
        <GraphSection data={results} />
        <BucketsSection address={poolAddress} />
      </>
    );
  } else {
    return <p>Failed to load Data</p>;
  }
};

export default Pool;
