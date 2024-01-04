import classnames from "classnames";
import _ from "lodash";
import { Link } from "react-router-dom";

const ResultTable = ({
  data,
  keyField,
  columns,
  gridColumnClassName,
  linkTo,
  emptyMessage,
  isLoading = false,
  ...rest
}) => {
  let RowComponent = "div";
  if (linkTo) {
    RowComponent = Link;
  }

  const justifyMapping = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  return (
    <div {...rest}>
      <div className={classnames("grid gap-3 text-gray-5 pb-1", gridColumnClassName)}>
        {columns.map((column, colIndex) => (
          <div
            key={_.isString(column.header) ? column.header : `col-${colIndex}`}
            className={classnames(
              "flex items-center",
              justifyMapping[column.cellAlign || "start"],
            )}
          >
            {column.header}
          </div>
        ))}
      </div>
      <div>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-12 flex items-center">
              <div className="bg-gray-21 rounded-2xl h-6 w-full"></div>
            </div>
            <div className="h-12 flex items-center">
              <div className="bg-gray-21 rounded-2xl h-6 w-full"></div>
            </div>
            <div className="h-12 flex items-center">
              <div className="bg-gray-21 rounded-2xl h-6 w-full"></div>
            </div>
          </div>
        ) : data && data.length > 0 ? (
          data.map((row, index) => (
            <RowComponent
              key={row[keyField]}
              className={classnames(
                "block grid gap-3  last:border-b-0",
                gridColumnClassName,
                { "cursor-pointer hover:text-gray-7": !!linkTo },
              )}
              to={_.isFunction(linkTo) ? linkTo(row) : linkTo}
            >
              {columns.map((column, colIndex) => (
                <div
                  key={`row-${row[keyField]}-${colIndex}`}
                  className={classnames(
                    "flex items-center py-3",
                    justifyMapping[column.cellAlign || "start"],
                  )}
                >
                  {column["cell"]({ row, index })}
                </div>
              ))}
            </RowComponent>
          ))
        ) : (
          <div className="text-gray-5">
            {emptyMessage ? emptyMessage : "No results"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultTable;
