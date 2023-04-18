
import GeneralTable from '@/components/table/GeneralTable';

const TokensSection = () => {
  const TableHeader = [
    { title: "#" },
    { title: "Name" },
    { title: "Price" },
    { title: "Pools" },
    { title: "TVL" },
  ];

  const TableData = [
    {
      href: "/",
      data: ["1", "ETH", 1500, 10, 10000],
    },
     {
      href: "/",
      data: ["2", "DAI", 1500, 10, 10000],
    },
     {
      href: "/",
      data: ["3", "USDC", 1500, 10, 10000],
    },
     {
      href: "/",
      data: ["4", "WBTC", 1500, 10, 10000],
    },
   
  ]



  return (
    <>
  <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
    <div className="flex flex-row justify-between items-center px-4">
      <h1 className=" py-9 text-xl md:text-1xl xl:text-2xl">
        Top Tokens
      </h1>
    </div>
    <div>
      <GeneralTable tableData={TableData} tableHeader={TableHeader} colClass="grid-cols-5"/>
    </div>

</section>
    </>
)};

export default TokensSection;