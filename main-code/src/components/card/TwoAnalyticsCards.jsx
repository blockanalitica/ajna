import SubAnalyticCard from "./SubAnalyticCard";

const TwoAnalyticsCards = () => {
    return (
        <div className="flex flex-col bg-black border border-gray-20 p-6 rounded-3xl">
            <div className="grid grid-cols-2 gap-2 ">
                <SubAnalyticCard title="35.63M" subtitle="TVL" info="0.18%" />
                <SubAnalyticCard title="1.88M" subtitle="Volume 24H" info="1.97%" />
                <SubAnalyticCard title="1.03K" subtitle="Fees in 24h"/>
                <SubAnalyticCard title="🔥 689" subtitle="AJNA burned" />
            </div>
            <div className="grid grid-cols-2 gap-2 ">
                <SubAnalyticCard title="35.63M" subtitle="TVL" info="0.18%" />
                <SubAnalyticCard title="1.88M" subtitle="Volume 24H" info="1.97%" />
                <SubAnalyticCard title="1.03K" subtitle="Fees in 24h"/>
                <SubAnalyticCard title="🔥 689" subtitle="AJNA burned" />
            </div>
        </div>
    )
}

export default TwoAnalyticsCards;