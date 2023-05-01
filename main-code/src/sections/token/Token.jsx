import TokenPoolsSection from "./TokenPoolsSection";
const Token = ({address}) => {

  return (
    <>
      <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
    <div className="flex flex-row justify-between items-center px-4">
      <h1 className=" py-9 text-xl md:text-1xl xl:text-2xl">
        {/* {address}  */}
      </h1>
     </div>
</section>
      <TokenPoolsSection address={address}/>
    </>
  );
};

export default Token;
