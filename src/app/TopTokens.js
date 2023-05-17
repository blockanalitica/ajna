import Button from "@/components/button/Button";
import TokensTable from "./TokensTable";

const TopTokens = () => {
  return (
    <section className="mt-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Tokens</h1>
        <Button text="View all" href="/tokens" />
      </div>
      <TokensTable />
    </section>
  );
};

export default TopTokens;
