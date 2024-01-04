import classnames from "classnames";
import _ from "lodash";
import { useMediaQuery } from "@/hooks";
import Pagination from "@/components/pagination/Pagination";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { Link } from "react-router-dom";
import HeaderCell from "./HeaderCell";
import TablePlaceholder from "./TablePlaceholder";

const Table = ({
  className,
  data = [],
  keyField,
  columns,
  linkTo,
  currentPage,
  pageSize,
  currentOrder,
  totalRecords,
  onPageChange,
  onOrderChange,
  allowOrder,
  footerRow,
  emptyIcon,
  emptyTitle,
  emptyContent,
  isLoading = false,
  placeholderRows,
  placeholderFooter,
  ...rest
}) => {
  const media = {
    sm: useMediaQuery("sm"),
    md: useMediaQuery("md"),
    lg: useMediaQuery("lg"),
    xl: useMediaQuery("xl"),
  };
  if (isLoading) {
    return (
      <TablePlaceholder
        className={className}
        rows={placeholderRows}
        footer={placeholderFooter}
      />
    );
  }

  let RowComponent = "div";
  if (linkTo) {
    RowComponent = Link;
  }

  const totalPages = Math.ceil(totalRecords / pageSize);

  const cellSizes = columns
    .map((column) => {
      if (column.visibleAfter && !media[column.visibleAfter]) {
        return null;
      }
      return column.cellSize || "1fr";
    })
    .join(" ");

  const justifyMapping = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  const itemsMapping = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  return (
    <div className={className}>
      <div
        className="bg-gray-24 border-gray-20 border rounded-3xl shadow-md p-0"
        {...rest}
      >
        <div
          className="grid gap-0 overflow-x-auto"
          style={{
            gridTemplateColumns: data.length > 0 ? cellSizes : false,
            gridTemplateRows: `minmax(50px, max-content) repeat(${data.length}, minmax(70px, max-content))`,
          }}
        >
          {data.length > 0 ? (
            <>
              <div className={classnames("contents text-gray-4 text-sm")}>
                {columns.map((column, colIndex) => {
                  const isVisible = column.visibleAfter
                    ? media[column.visibleAfter]
                    : true;
                  if (!isVisible) {
                    return null;
                  }
                  return (
                    <HeaderCell
                      key={`col-${colIndex}`}
                      align={column.headerAlign}
                      orderField={column.orderField}
                      currentOrder={currentOrder}
                      onOrderChange={onOrderChange}
                      onPageChange={onPageChange}
                      allowOrder={allowOrder}
                      className={classnames("p-3", {
                        "sticky left-0 z-10 bg-gray-24 rounded-tl-3xl": column?.sticky,
                      })}
                    >
                      {column.header}
                    </HeaderCell>
                  );
                })}
              </div>

              {data.map((row, index) => {
                const rowKey = _.isFunction(keyField) ? keyField(row) : row[keyField];
                return (
                  <RowComponent
                    key={rowKey}
                    className={classnames("contents", {
                      "cursor-pointer hover:text-gray-7": !!linkTo,
                    })}
                    style={{ gridTemplateColumns: cellSizes }}
                    to={_.isFunction(linkTo) ? linkTo(row) : linkTo}
                  >
                    {columns.map((column, colIndex) => {
                      const isVisible = column.visibleAfter
                        ? media[column.visibleAfter]
                        : true;
                      if (!isVisible) {
                        return null;
                      }
                      return (
                        <div
                          key={`row-${rowKey}-${colIndex}`}
                          className={classnames(
                            "flex items-center border-b border-gray-19 px-4 py-3",
                            justifyMapping[column.cellAlign || "start"],
                            {
                              "border-b-0 rounded-bl-3xl":
                                !footerRow && index === data.length - 1,
                              "sticky left-0 z-10 bg-gray-24": column?.sticky,
                            }
                          )}
                        >
                          <div
                            className={classnames(
                              "flex flex-col",
                              itemsMapping[column.cellAlign || "start"]
                            )}
                          >
                            <div className="flex">{column["cell"]({ row, index })}</div>
                            <div className="flex text-sm text-gray-6">
                              {column["smallCell"]
                                ? column["smallCell"]({ row, index })
                                : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </RowComponent>
                );
              })}
            </>
          ) : (
            <GenericEmptyPlaceholder
              title={emptyTitle}
              content={emptyContent}
              icon={emptyIcon}
            />
          )}
        </div>
        {footerRow && data.length > 0 ? (
          <div className="px-9 py-5 text-gray-7">{footerRow}</div>
        ) : null}
      </div>
      {totalPages > 1 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-6"
        />
      ) : null}
    </div>
  );
};

export default Table;
