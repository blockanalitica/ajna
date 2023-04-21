import CryptoIcon from "@/components/icon/CryptoIcon";
import SubAnalyticCard from "./SubAnalyticCard";

const InforPlusAnalyticsCard = () => {
    return (
        <div className="grid grid-cols-1 place-content-between w-full  bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl p-7 rounded-3xl">
            <div>
                <h3 className="text-xl font-syncopate uppercase text-white mb-4">Total tokens locked</h3>
                <div className="text-xl">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between items-center"><CryptoIcon name={"ETH"} size={20} className="mr-2"/> ETH  </div>
                        <div> 15.31M </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between items-center"><CryptoIcon name={"DAI"} size={20} className="mr-2"/> DAI  </div>
                        <div> 15.31M </div>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-2 gap-4 ">
                <SubAnalyticCard title="35.63M" subtitle="TVL" info="0.18%" />
                <SubAnalyticCard title="1.88M" subtitle="Volume 24H" info="1.97%" />
                <SubAnalyticCard title="1.03K" subtitle="Fees in 24h"/>
                <SubAnalyticCard title="🔥 689" subtitle="AJNA burned" />
            </div>
        </div>
    )
}

export default InforPlusAnalyticsCard;