const AnalyticCard = ({ title, subtitle }) => (
    <div class="px-3 py-7 flex flex-col items-center justify-center bg-gray-23 rounded-3xl">
        <dt class="mb-2 text-3xl font-extrabold">{ title }</dt>
        <dd class="text-gray-500 dark:text-gray-400">{ subtitle }</dd>
    </div>
)

export default AnalyticCard;