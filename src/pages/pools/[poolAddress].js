import { useFetch } from "@/hooks.js";
import { GraphSection, SearchSection } from "@/sections";
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

  return (
    <>
      <SearchSection showTimePicker={true} />
      <GraphSection data={results} />
    </>
  );
};

export default Pool;
