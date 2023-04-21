import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardBackground from "./CardBackgroud";

const AnalyticCard = ({ value, subtitle }) => (
    <CardBackground>
        <div className="text-gray-5 font-light text-sm py-2 font-syncopate uppercase">{ subtitle }</div>
        <div className="mb-2 text-2xl font-bold"><Value value={value} decimals={2} compact prefix={"$"}/></div>
        <div className="mb-2 text-sm font-bold"><ValueChange value={value} decimals={2} compact prefix={"$"} /></div>
    </CardBackground>
)

export default AnalyticCard;