const AnalyticCard = ({ title, subtitle }) => (
    <div className="px-3 py-7 flex flex-col items-center justify-center bg-gray-23 rounded-3xl">
        <dt className="mb-2 text-2xl font-bold">{ title }</dt>
        <dd className="text-gray-5 font-light text-sm">{ subtitle }</dd>
    </div>
)

export default AnalyticCard;