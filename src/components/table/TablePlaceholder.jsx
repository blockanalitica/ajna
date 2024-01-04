import _ from "lodash";
import classnames from "classnames";
import CardBackground from "@/components/card/CardBackground";

const TablePlaceholder = ({ rows = 3, footer = false }) => {
  return (
    <CardBackground className="!p-0">
      <div className="animate-pulse">
        <div className="border-b border-gray-19 px-9 py-5 grid gap-3 grid-cols-table-placeholder">
          <div className="h-5 bg-gray-21 opacity-70 rounded-lg"></div>
          <div className="h-5 bg-gray-21 opacity-70 rounded-lg"></div>
          <div className="h-5 bg-gray-21 opacity-70 rounded-lg"></div>
          <div className="h-5 bg-gray-21 opacity-70 rounded-lg"></div>
          <div className="h-5 bg-gray-21 opacity-70 rounded-lg"></div>
        </div>
        <div className="mx-5">
          {_.range(rows).map((value) => (
            <div
              key={`ph-${value}`}
              className={classnames(
                "border-b border-gray-20 p-4 min-h-[78px] grid gap-3 grid-cols-table-placeholder items-center",
                { "last:border-b-0": !footer },
              )}
            >
              <div className="h-6 bg-gray-21 opacity-30 rounded-lg"></div>
              <div className="h-6 bg-gray-21 opacity-30 rounded-lg"></div>
              <div className="h-6 bg-gray-21 opacity-30 rounded-lg"></div>
              <div className="h-6 bg-gray-21 opacity-30 rounded-lg"></div>
              <div className="h-6 bg-gray-21 opacity-30 rounded-lg"></div>
            </div>
          ))}

          {footer ? <div className="h-[60px]"></div> : null}
        </div>
      </div>
    </CardBackground>
  );
};

export default TablePlaceholder;
