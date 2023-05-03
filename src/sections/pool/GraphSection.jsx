import InfoPlusAnalyticsCard from "@/components/card/InfoPlusAnalyticsCard"
import MainBarGraph from "@/components/graph/MainBarGraph"

const GraphSection = (promps) => {
    return (<section className="mx-auto max-w-9xl p-10">
    <div className="grid grid-cols-3 gap-4 ">
        <div className=" flex items-stretch">
            <InfoPlusAnalyticsCard data={promps.data}/>
        </div>
        <div className="col-span-2">
            <MainBarGraph />
        </div>
        {/* <div className="w-full flex items-stretch">
            <TwoAnalyticsCards />
        </div>
        <div className="col-span-2">
            <MainBarGraph />
        </div> */}
    </div>
    </section>
)}


export default GraphSection