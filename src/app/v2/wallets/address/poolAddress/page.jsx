import { useParams } from "react-router-dom";
import { usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import { useFetch } from "@/hooks";
import { shorten } from "@/utils/address";
import Stats from "@/components/stats/Stats";
import Value from "@/components/value/Value";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { faCalendarDays, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HistoricGraphs from "./HistoricGraphs";
// import Events from "./Events";
// import Pools from "./Pools";
// import WalletAdditionalInfo from "./WalletAdditionalInfo";

const WalletPoolPosition = () => {
  const { address, poolAddress } = useParams();

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/wallets/${address}/pools/${poolAddress}/`);

  usePageTitle(`Wallet ${shorten(address)}`);

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <GenericPlaceholder />;
  }

  const stats = [
    {
      title: "Deposited",
      value: (
        <>
          <Value value={data.supply} suffix={data.quote_token_symbol} />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.supply_usd} prefix="$" />
        </>
      ),
    },
    {
      title: "Borrowed",
      value: (
        <>
          <Value value={data.debt} suffix={data.quote_token_symbol} />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.debt_usd} prefix="$" />
        </>
      ),
    },
    {
      title: "Collateral",
      value: (
        <>
          <Value value={data.collateral} suffix={data.collateral_token_symbol} />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.collateral_usd} prefix="$" />
        </>
      ),
    },
    {
      title: "Health Rate",
      value: (
        <>
          {data.health_rate ? (
            <Value value={data.health_rate} decimals={3} />
          ) : (
            <FontAwesomeIcon icon={faInfinity} />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
      </section>

      <h1 className="text-xl md:text-1xl xl:text-2xl mb-5 flex">
        <div>Wallet {shorten(address)} position in</div>
        <div className="flex items-center pl-3">
          <span className="relative flex">
            <CryptoIcon name={data.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={data.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>

          <h1 className="text-2xl">
            {data.collateral_token_symbol} / {data.quote_token_symbol}
          </h1>
        </div>
      </h1>

      <Stats data={stats} />

      <HistoricGraphs />
    </>
  );
};

export default WalletPoolPosition;
