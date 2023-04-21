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
