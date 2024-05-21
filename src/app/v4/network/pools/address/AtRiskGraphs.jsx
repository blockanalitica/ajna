import { useFetch } from "@/hooks";
import CardBackground from "@/components/card/CardBackground";
import AtRiskCumulativeGraph from "./AtRiskCumulativeGraph";
import AtRiskPerDropGraph from "./AtRiskPerDropGraph";

const AtRiskGraphs = ({ poolAddress, collateralSymbol, collateralAddress }) => {
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

  return (
    <div>
      <h1 className="text-xl md:text-1xl xl:text-2xl">Collateral at Risk</h1>
      <div className="flex flex flex-col lg:flex-row lg:gap-4 mt-5">
        <CardBackground className="lg:w-1/2 mb-5">
          <AtRiskCumulativeGraph
            data={data}
            collateralSymbol={collateralSymbol}
            collateralAddress={collateralAddress}
          />
        </CardBackground>
        <CardBackground className="lg:w-1/2 mb-5">
          <AtRiskPerDropGraph
            data={data}
            collateralSymbol={collateralSymbol}
            collateralAddress={collateralAddress}
          />
        </CardBackground>
      </div>
    </div>
  );
};

export default AtRiskGraphs;
