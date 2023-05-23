import queryString from "query-string";

export const fetchApi = async (path, query) => {
  let qs = queryString.stringify(query, { skipNull: true });
  if (qs) {
    qs = `?${qs}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}${qs}`, {
    cache: "no-store",
  });
  return response.json();
};
