import CryptoIcon from "@/components/icon/CryptoIcon";
import { useFetch } from "@/hooks.js";
import TokenInfoSection from "./TokenInfoSection";
import TokenPoolsSection from "./TokenPoolsSection";
const Token = ({ address }) => {
  const { data, error, isLoading } = useFetch(`/tokens/${address}/`);
  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>; 
  }

  const item = data.results;
  return (
    <>
      <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
        <div className="flex px-4">
          <CryptoIcon name={item.symbol} size={"30"} />
          <h1 className="ml-4 py-9 text-xl md:text-1xl xl:text-2xl">
            {item.symbol}
          </h1>
        </div>
      </section>
      <TokenInfoSection address={address} />
      <TokenPoolsSection address={address} />
    </>
  );
};

export default Token;
