import TokenPoolsTable from "./TokenPoolsTable";

const TokenPools = ({ address }) => {
  return (
    <section className="mt-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Pools</h1>
      </div>
      <TokenPoolsTable address={address} />
    </section>
  );
};

export default TokenPools;
