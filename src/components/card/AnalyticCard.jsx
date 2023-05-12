import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const AnalyticCard = ({ value, subtitle }) => (
  <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
    <dd className="text-gray-5 font-light text-sm py-2 font-syncopate">{subtitle}</dd>
    <dt className="mb-2 text-2xl font-bold">
      <Value value={value} decimals={2} compact prefix={"$"} />
    </dt>
    <dt className="mb-2 text-sm font-bold">
      <ValueChange value={value} decimals={2} compact prefix={"$"} />
    </dt>
  </div>
);

export default AnalyticCard;
