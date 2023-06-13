"use client";

import { useEffect } from "react";
import queryString from "query-string";
import useSWR from "swr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const clickOutsideEvents = ["mousedown", "touchstart"];
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useFetch = (path, query) => {
  let qs = queryString.stringify(query, { skipNull: true });
  if (qs) {
    qs = `?${qs}`;
  }

  return useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}${qs}`, fetcher);
};

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    if (!handler) {
      return;
    }

    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    clickOutsideEvents.forEach((event) => {
      document.addEventListener(event, listener);
    });

    return () => {
      clickOutsideEvents.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [ref, handler]);
};

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = searchParams;
  const urlSearchParams = new URLSearchParams(searchParams);

  function setQueryParams(params) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  return { queryParams, setQueryParams };
};
