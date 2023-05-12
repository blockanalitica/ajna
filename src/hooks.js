import queryString from "query-string";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useFetch = (path, query) => {
  let qs = queryString.stringify(query, { skipNull: true });
  if (qs) {
    qs = `?${qs}`;
  }

  return useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}${qs}`, fetcher);
};


// use to call /pools/ endpoint
export const fetchPools = (url) => {
  const { data, error, isLoading } = useFetch(url);
  if (error) {
    return {err: 0, tableData: "Failed to load pools data"};
  }
  if (isLoading) {
    return {err:0, tableData: "Loading...."};
  }

  const tableData = data.results;
  return {err:1, tableData: tableData};
};