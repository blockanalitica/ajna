const SubAnalyticCard = ({ title, subtitle, info }) => (
    <div className="px-3 py-7 text-left  flex flex-col items-center bg-gray-22 rounded-3xl">
        <div className="text-l uppercase font-bold text-gray-7">{ subtitle }</div>
        <div className="mb-2 text-3xl font-extrabold">{ title }</div>
        { info && 
        <div className="text-gray-500 dark:text-gray-400">{ info }</div> 
        }
    </div>
)

export default SubAnalyticCard;