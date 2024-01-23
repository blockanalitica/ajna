import { useState } from "react";
import { useQueryParams, usePageTitle, useFetch } from "@/hooks";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import NetworksTable from "./NetworksTable";
import NetworksInfo from "./NetworksInfo";
import HistoricGraphs from "./HistoricGraphs";
import { Link } from "react-router-dom";
import ajnaLogo from "@/assets/images/logos/AJNA-Logo-LG.svg";

const Page = () => {
  usePageTitle("Info Ajna Dashboard");
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;
  const [order, setOrder] = useState("-tvl");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(
    "/overall/",
    {
      order,
      days_ago: daysAgo,
    },
    null,
    true,
  );

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, totals } = data;

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  return (
    <div>
      <nav className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-5">
        <Link to="/" className="mb-5">
          <img src={ajnaLogo} width="130" height="24" alt="Ajna" className="h-auto" />
        </Link>
        <div className="mb-5">
          <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
        </div>
      </nav>

      <NetworksInfo data={totals} isLoading={isLoading} className="mb-10" />

      <NetworksTable
        data={results}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        className="mb-10"
      />

      {isLoading ? null : <HistoricGraphs days_ago={daysAgo} totals={totals} />}
    </div>
  );
};

export default Page;
