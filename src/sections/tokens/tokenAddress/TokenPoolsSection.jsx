import TokenPoolsTable from "@/components/table/specific/TokenPoolsTable";
const TokenPoolsSection = ({address}) => {
  return (
    <>
      <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center px-4">
          <h1 className=" py-9 text-xl md:text-1xl xl:text-2xl">Pools</h1>
        </div>
        <TokenPoolsTable address={address} />
      </section>
    </>
  );
};

export default TokenPoolsSection;
