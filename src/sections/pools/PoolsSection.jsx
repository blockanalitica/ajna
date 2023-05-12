import PoolsOptions from './PoolsOptions';
import PoolsTable from './PoolsTable';


const PoolsSection = () => {
  return (
    <>
  <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
    <div className="flex flex-row justify-between items-center px-4">
      <h1 className="py-9 text-xl md:text-1xl xl:text-2xl">
        Pools 
      </h1>
      <PoolsOptions />
      {/* <button onClick={toggleDivs}><TableCardViewIcon cardView={ showFirstDiv } /></button> */}
    </div>
    <div>
         <PoolsTable />
    </div>
</section>
    </>
)};

export default PoolsSection;