import PrimaryButton from "@/components/button/PrimaryButton";
import TokensTable from "./TokensTable";

const TopTokens = () => {
  return (
    <section className="mt-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Tokens</h1>
        <PrimaryButton title="View all" location="/tokens/" />
      </div>
      <TokensTable />
    </section>
  );
};

export default TopTokens;
