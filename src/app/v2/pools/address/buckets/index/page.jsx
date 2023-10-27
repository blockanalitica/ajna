import { useParams } from "react-router-dom";
import { faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CardBackground from "@/components/card/CardBackground";
import Value from "@/components/value/Value";
import { useFetch, useQueryParams } from "@/hooks";
import Kpi from "@/components/kpis/Kpi";
import PoolName from "@/components/poolName/PoolName";
import HistoricGraphs from "./HistoricGraphs";
import Depositors from "./Depositors";
import Events from "./Events";

const Bucket = () => {
  const { queryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;
  const { address, index } = useParams();
  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/buckets/${index}`);

  if (error) {
    return <p>Failed to load data</p>;
  }

  if (isLoading) {
    return <GenericPlaceholder />;
  }

  const {
    collateral_token_symbol: collateralTokenSymbol,
    quote_token_symbol: quoteTokenSymbol,
    bucket_index: bucketIndex,
    bucket_price: bucketPrice,
    is_utilized: isUtilized,
    deposit,
    collateral,
  } = data;

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
      </section>
      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <PoolName
            collateralSymbol={collateralTokenSymbol}
            quoteSymbol={quoteTokenSymbol}
            size="xl"
            className="font-syncopate"
          />
          <div className="text-2xl font-syncopate uppercase pl-3">
            Bucket {bucketIndex}
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:gap-4">
        <CardBackground className="md:w-1/3 grid grid-cols-1 place-content-between mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
              Bucket {bucketIndex}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Kpi
              title="Deposit"
              value={<Value value={deposit} suffix={quoteTokenSymbol} />}
            />
            <Kpi
              title="Collateral"
              value={<Value value={collateral} suffix={collateralTokenSymbol} />}
            />
            <Kpi
              title="Price"
              value={<Value value={bucketPrice} suffix={quoteTokenSymbol} />}
            />
            <Kpi
              title="Utilized"
              value={
                isUtilized ? (
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-8" />
                ) : (
                  <FontAwesomeIcon icon={faCircleXmark} className="text-red-8" />
                )
              }
            />
          </div>
        </CardBackground>

        <CardBackground className="md:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between">
          <HistoricGraphs
            daysAgo={daysAgo}
            collateralTokenSymbol={collateralTokenSymbol}
            quoteTokenSymbol={quoteTokenSymbol}
          />
        </CardBackground>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:gap-4">
        <div className="md:w-1/3">
          <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Depositors</h1>
          <Depositors />
        </div>
        <Events className="md:w-2/3" />
      </div>
    </>
  );
};

export default Bucket;
