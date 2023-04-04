import InfoPlusAnalyticsCard from "@/components/card/InfoPlusAnalyticsCard"
import MainBarGraph from "@/components/graph/MainBarGraph"

const GraphSection = () => (
    <section className="mx-auto max-w-9xl p-10">
    <div className="grid grid-cols-3 gap-6 ">
        <div className="">
            <InfoPlusAnalyticsCard />
        </div>
        <div className="col-span-2">
            <MainBarGraph />
        </div>
    </div>
    </section>
)


export default GraphSection