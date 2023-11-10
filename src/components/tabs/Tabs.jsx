import classnames from "classnames";

const Tabs = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={classnames("", className)}>
      <div className="flex flex-wrap gap-x-10 border-b border-gray-13 mb-8">
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
    </div>
  );
};

export default Tabs;
