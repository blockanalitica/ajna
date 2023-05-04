import { GraphSection, SearchSection, Token } from "@/sections";
import { useRouter } from "next/router";

const TokenPage = () => {
  const { query } = useRouter();
  const { tokenAddress } = query;
  return (
    <>
      <SearchSection showTimePicker={true} />
      {/* <GraphSection /> */}
      <Token address={tokenAddress} />
    </>
  );
};

export default TokenPage;
