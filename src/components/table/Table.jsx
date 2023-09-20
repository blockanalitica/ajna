import classnames from "classnames";
import _ from "lodash";
import { useMediaQuery } from "@/hooks";
import CardBackground from "@/components/card/CardBackground";
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
      <CardBackground className="!p-0" {...rest}>
        <div
          className={classnames(
            "grid gap-3 text-gray-4 border-b border-gray-19 text-sm px-6 sm:px-9 py-5"
          )}
          style={{ gridTemplateColumns: cellSizes }}
        >
          {columns.map((column, colIndex) => {
            const isVisible = column.visibleAfter ? media[column.visibleAfter] : true;
            if (!isVisible) {
              return null;
            }
            return (
              <HeaderCell
                key={column.header || `col-${colIndex}`}
                align={column.headerAlign}
                orderField={column.orderField}
                currentOrder={currentOrder}
                onOrderChange={onOrderChange}
                onPageChange={onPageChange}
                allowOrder={allowOrder}
              >
                {column.header}
              </HeaderCell>
            );
          })}
        </div>
        <div className="mx-2 sm:mx-5">
          {data.length > 0 ? (
            data.map((row, index) => (
              <RowComponent
                key={row[keyField]}
                className={classnames(
                  "block grid gap-3 border-b border-gray-20 px-4 min-h-[78px]",
                  {
                    "cursor-pointer hover:text-gray-7": !!linkTo,
                    "last:border-b-0": !footerRow,
                  }
                )}
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
                      key={`row-${row[keyField]}-${colIndex}`}
                      className={classnames(
                        "flex items-center py-4",
                        justifyMapping[column.cellAlign || "start"]
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
            ))
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
      </CardBackground>
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
