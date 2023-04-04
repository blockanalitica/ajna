import MainBarGraph from "@/components/graph/MainBarGraph"

const GraphSection = () => (
    <>
    <div className="flex flex-col bg-black border border-gray-20 p-6 rounded-3xl">
        <h3 className="text-2xl font-syncopate uppercase text-white">Total tokens locked</h3>
        <div className="flex flex-row justify-between items-center">
            <div> ETH  </div>
            <div> 15.31M </div>
        </div>
        <div className="flex flex-row justify-between items-center">
            <div> DAI  </div>
            <div> 15.31M </div>
        </div>
    </div>
    <div className="flex flex-col justify-between bg-black border border-gray-20 p-6 rounded-3xl">
        <MainBarGraph />
    </div>
    </>
)


export default GraphSection