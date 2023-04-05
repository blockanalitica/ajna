const AnalyticCard = ({ title, subtitle }) => (
    <div className="px-3 py-7 flex flex-col items-center justify-center bg-gray-22 rounded-3xl">
        <dt className="mb-2 text-3xl font-extrabold">{ title }</dt>
        <dd className="text-gray-500 dark:text-gray-400">{ subtitle }</dd>
    </div>
)

export default AnalyticCard;