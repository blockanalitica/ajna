import TokensTable from "@/components/table/specific/TokensTable";
const Tokens = () => {
  return (
    <>
      <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center px-4">
          <h1 className=" py-9 text-xl md:text-1xl xl:text-2xl">Tokens</h1>
        </div>
        <TokensTable />
      </section>
    </>
  );
};

export default Tokens;
