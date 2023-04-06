import PrimaryButton from '@/components/button/PrimaryButton';
import MiningCard from '@/components/card/MiningCard';
import GeneralTable from '@/components/table/GeneralTable';
import TagComp from '@/components/tags/TagComp';
import Link from 'next/link';

const PoolsSection = () => {
  const TableHeader = [
    { title: "# Collateral token / Quote Token" },
    { title: "APR ?" },
    { title: "Liquidity" },
    { title: "AJNA Burned" },
  ];

  const TableData = [
    {
      href: "/",
      data: ["1 DAI / USDC", <TagComp className="mx-4 my-2" title="4.25%"/>, "1.18M USD", "1,273 AJNA"],
    },
    {
      href: "/",
      data: ["1 DAI / USDC", <TagComp className="mx-4 my-2" title="4.25%"/>, "1.18M USD", "1,273 AJNA"],
    },
    {
      href: "/",
      data: ["1 DAI / USDC", <TagComp className="mx-4 my-2" title="4.25%"/>, "1.18M USD", "1,273 AJNA"],
    },
    {
      href: "/",
      data: ["1 DAI / USDC", <TagComp className="mx-4 my-2" title="4.25%"/>, "1.18M USD", "1,273 AJNA"],
    }
  ]

  return (
    <>
  <section className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
      <h1 className=" py-5 mb-4 text-xl md:text-1xl xl:text-2xl">
        Top Pools 
      </h1>

      <GeneralTable tableData={TableData} tableHeader={TableHeader} colClass="grid-cols-first-big" />
      
      <div className="relative overflow-x-auto border rounded-2xl border-gray-20 py-5 px-5">
        <div className='relative overflow-x-auto shadow-md rounded-2xl'>
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-21 p-2 text-white rounded-2xl">
              <tr className='rounded-2xl'>
                <th className="px-6 py-5  rounded-l-2xl"># Collateral token / Quote Token</th>
                <th className="px-6 py-5">APR ?</th>
                <th className="px-6 py-5">Total Value Locked ?</th>
                <th className="px-6 py-5">AJNA Burned ?</th>
                <th className="px-6 py-5  rounded-r-2xl">Pool Actions</th>
              </tr>
            </thead>
            <tbody >
              <tr className='p-2 border-b border-gray-20'>
                <td className="px-6 py-3">1 DAI / USDC</td>
                <td className="px-6 py-3"><TagComp className="mx-4 my-2" title="4.25%"/></td>
                <td className="px-6 py-3">1.18M USDC</td>
                <td className="px-6 py-3">1,273 AJNA</td>
                <td className="px-6 py-3"><Link href="/" className="rounded-full border border-purple-7 hover:bg-purple-8 px-12 py-2">Details</Link></td>
              </tr>
              <tr className='p-2 border-b border-gray-20'>
                <td className="px-6 py-3">1 DAI / USDC</td>
                <td className="px-6 py-3"><TagComp className="mx-4 my-2" title="4.25%"/></td>
                <td className="px-6 py-3">1.18M USDC</td>
                <td className="px-6 py-3">1,273 AJNA</td>
                <td className="px-6 py-3"><Link href="/" className="rounded-full border border-purple-7 hover:bg-purple-8 px-12 py-2">Details</Link></td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>


      <h1 className=" py-5 mb-4 text-xl md:text-1xl xl:text-2xl">
        Top Pools 
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <MiningCard />
        <MiningCard />
      </div>
</section>
    </>
)};

export default PoolsSection;