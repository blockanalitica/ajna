import TagComp from "../tags/Tag";

const MiningCard = () => (
<div className="max-w-sm p-6 bg-gray-23 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-between">
        <div className="rounded-full p-2 bg-white">
        .</div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ETH / DAI
        </h5>
        <a
        href="#"
        >
            ...
        </a>
    </div>
    <div className="flex-auto">
        <div>
            <div>1.0</div>
            <div>ETH</div>
            <div>Colateral</div>
        </div>
        <div>
            <div>1.0</div>
            <div>DAI</div>
            <TagComp title="Quote"/>
        </div>
    </div>
    <div className="flex-auto"></div>

    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
    </a>
</div>
)

export default MiningCard;