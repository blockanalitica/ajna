import classnames from "classnames";
import CardBackground from "@/components/card/CardBackground";

const TabCard = ({ tabs, activeTab, onTabChange, ...rest }) => {
  return (
    <CardBackground {...rest}>
      <div className="flex gap-x-10 border-b border-gray-13 mb-8">
        {Object.entries(tabs).map(([key, tab]) => (
          <div
            key={`tab-${key}`}
            className={classnames(
              "font-semibold uppercase cursor-pointer hover:text-ajna-aqua",
              { "text-primary-5 border-b-2": key === activeTab }
            )}
            onClick={() => onTabChange(key)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div key={activeTab}>{tabs[activeTab].content}</div>
    </CardBackground>
  );
};

export default TabCard;
