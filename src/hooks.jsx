import { useEffect, useState } from "react";
import queryString from "query-string";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import urlJoin from "url-join";
import { smartLocationParts } from "@/utils/url";

const clickOutsideEvents = ["mousedown", "touchstart"];

export const useFetch = (path, query, options) => {
  const location = useLocation();
  const { version, network } = smartLocationParts(location);

  let qs = queryString.stringify(query, { skipNull: true, skipEmptyString: true });
  if (qs) {
    qs = `?${qs}`;
  }

  const url = urlJoin(version, network, path, "/", qs);

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
    url,
    async () => {
      const { data } = await axios.get(url);
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
    // ErrorFallbackComponent: ErrorFallback,
  };
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
  const location = useLocation();
  const navigate = useNavigate();

  const urlSearchParams = new URLSearchParams(location.search);

  const setQueryParams = (params) => {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    navigate(`${location.pathname}${query}`, { replace: true });
  };

  return { queryParams: urlSearchParams, setQueryParams };
};

export const useMediaQuery = (size, type = "min-width") => {
  // This is tailwinds default
  const mapping = {
    sm: `(${type}: 640px)`,
    md: `(${type}: 768px)`,
    lg: `(${type}: 1024px)`,
    xl: `(${type}: 1280px)`,
    "2xl": `(${type}: 1536px)`,
  };
  let mediaMatch;
  if (typeof window !== "undefined") {
    mediaMatch = window.matchMedia(mapping[size]);
  }

  const [match, setMatch] = useState(mediaMatch ? mediaMatch.matches : null);

  useEffect(() => {
    if (mediaMatch) {
      const handler = (e) => setMatch(e.matches);
      mediaMatch.addListener(handler);
      return () => mediaMatch.removeListener(handler);
    }
  });
  return match;
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

export const useSmartNavigate = () => {
  const navigate = useNavigate();

  const smartNavigate = (e, path) => {
    e.preventDefault();

    const actualPath = path;
    if (e.ctrlKey || e.metaKey) {
      window.open(actualPath, "_blank");
    } else {
      navigate(actualPath);
    }
  };

  return smartNavigate;
};

export const useLinkBuilder = () => {
  const location = useLocation();
  let { version, network } = smartLocationParts(location);
  if (version === "v1") {
    version = "";
  }

  const buildLink = (path) => {
    let url = urlJoin("/", version, network, path);
    url = url.replace(/\/$/, "");
    return url;
  };

  return buildLink;
};
