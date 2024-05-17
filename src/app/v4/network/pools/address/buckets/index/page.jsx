import { useParams } from "react-router-dom";
import { faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CardBackground from "@/components/card/CardBackground";
import CurrencyValue from "@/components/value/CurrencyValue";
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
    collateral_token_address: collateralTokenAddress,
    quote_token_symbol: quoteTokenSymbol,
    quote_token_address: quoteTokenAddress,
    bucket_index: bucketIndex,
    bucket_price: bucketPrice,
    is_utilized: isUtilized,
    deposit,
    collateral,
  } = data;

  return (
    <>
      <section className="mb-10">
        <Breadcrumbs />
      </section>
      <div className="flex flex-col sm:flex-row items-center">
        <PoolName
          collateralSymbol={collateralTokenSymbol}
          collateralAddress={collateralTokenAddress}
          quoteSymbol={quoteTokenSymbol}
          quoteAddress={quoteTokenAddress}
          size="xl"
          className="font-syncopate mb-5"
        />
        <div className="text-2xl font-syncopate uppercase pl-3 mb-5">
          Bucket {bucketIndex}
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
              value={
                <CurrencyValue
                  value={deposit}
                  currencySymbol={quoteTokenSymbol}
                  currencyAddress={quoteTokenAddress}
                />
              }
            />
            <Kpi
              title="Collateral"
              value={
                <CurrencyValue
                  value={collateral}
                  currencySymbol={collateralTokenSymbol}
                  currencyAddress={collateralTokenAddress}
                />
              }
            />
            <Kpi
              title="Price"
              value={
                <CurrencyValue
                  value={bucketPrice}
                  currencySymbol={quoteTokenSymbol}
                  currencyAddress={quoteTokenAddress}
                />
              }
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
            collateralTokenAddress={collateralTokenAddress}
            quoteTokenSymbol={quoteTokenSymbol}
            quoteTokenAddress={quoteTokenAddress}
          />
        </CardBackground>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:gap-4">
        <div className="md:w-1/3 mb-5">
          <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Depositors</h1>
          <Depositors />
        </div>
        <Events className="md:w-2/3 col-span-2 grid grid-cols-1 mb-5" />
      </div>
    </>
  );
};

export default Bucket;
