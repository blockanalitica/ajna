import { Suspense } from "react";
import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
// async function getPosts() {
//   const res = await fetch('https://...');
//   const posts = await res.json();
//   return posts;
// }

const getStats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/stats/overview/`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const Page = async () => {
  const statsPromise = getStats();

  return (
    <>
      <Suspense fallback={<p>Loading ...</p>}>
        <TotalStats promise={statsPromise} />
      </Suspense>
      <TopPools />
    </>
  );
};

export default Page;
