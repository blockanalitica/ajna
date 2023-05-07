import PoolBucketsTable from "./PoolBucketsTable";
const BucketsSection = ({ address }) => {
  return (
    <>
      <section className="mx-auto max-w-9xl px-4 mt-5 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center px-4">
          <h3 className="py-9 text-xl md:text-1xl xl:text-xl font-syncopate">
            Buckets
          </h3>
        </div>
        <PoolBucketsTable address={address} />
      </section>
    </>
  );
};

export default BucketsSection;
