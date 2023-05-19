import TokenPoolsTable from "./TokenPoolsTable";

const TokenPools = ({ address, ...rest }) => {
  return (
    <section {...rest}>
      <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Pools</h1>
      <TokenPoolsTable address={address} />
    </section>
  );
};

export default TokenPools;
