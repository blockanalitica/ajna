import { useFetch } from "@/hooks";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import CardBackground from "@/components/card/CardBackground";
import AtRiskCumulativeGraph from "./AtRiskCumulativeGraph";
import AtRiskPerDropGraph from "./AtRiskPerDropGraph";

const AtRiskGraphs = ({ poolAddress, collateralSymbol }) => {
  const { data, error, isLoading } = useFetch(`/pools/${poolAddress}/at-risk/`);
  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center flex-col animate-pulse">
        <div className="w-20 h-20 mt-20 mb-4 bg-gray-22 rounded-full p-4 flex items-center justify-center"></div>
      </div>
    );
  }

  if (!data || (data && data.length === 0)) {
    return (
      <GenericEmptyPlaceholder
        title="No data"
        content="There is no data"
        icon={faChartBar}
      />
    );
  }

  return (
    <div>
      <h1 className="text-xl md:text-1xl xl:text-2xl">Collateral at Risk</h1>
      <div className="flex flex flex-col lg:flex-row lg:gap-4 mt-5">
        <CardBackground className="lg:w-1/2 mb-5">
          <h2 className="font-syncopate uppercase mb-3">Cumulative per drop</h2>
          <AtRiskCumulativeGraph data={data} collateralSymbol={collateralSymbol} />
        </CardBackground>
        <CardBackground className="lg:w-1/2 mb-5">
          <h2 className="font-syncopate uppercase mb-3">Per drop</h2>
          <AtRiskPerDropGraph data={data} collateralSymbol={collateralSymbol} />
        </CardBackground>
      </div>
    </div>
  );
};

export default AtRiskGraphs;
