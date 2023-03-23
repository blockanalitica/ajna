import axios from "axios";
import queryString from "query-string";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import ErrorFallback from "./components/errorFallback/ErrorFallback.js";

export const useFetch = (path, query, options) => {
  let qs = queryString.stringify(query, { skipNull: true });
  if (qs) {
    qs = `?${qs}`;
  }

  const url = `/v1/goerli/${path}`;

  const settings = {
    retry: (failureCount, error) => {
      // Don't retry on 404 errors
      if (error.response && error.response.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    ...options,
  };

  const response = useQuery(
    [url, query],
    async () => {
      const { data } = await axios.get(`${url}${qs}`);
      return data;
    },
    settings
  );
  // Potential todo:
  // -> dispatch and action
  // -> manipulate the response before sending back to component
  // -> whatever makes sense for you to put here...
  return {
    ...response,
    ErrorFallbackComponent: ErrorFallback,
  };
};

export const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title + " | Block Analitica";
    return () => {
      document.title = prevTitle;
    };
  });
};

export const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};
