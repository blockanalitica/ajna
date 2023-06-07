"use client";

import classnames from "classnames";
import _ from "lodash";
import CardBackground from "@/components/card/CardBackground";
import Pagination from "@/components/pagination/Pagination";
import Link from "next/link";
import HeaderCell from "./HeaderCell";
import TablePlaceholder from "./TablePlaceholder";

const Table = ({
  className,
  data,
  keyField,
  columns,
  gridColumnClassName,
  href,
  currentPage,
  pageSize,
  currentOrder,
  totalRecords,
  onPageChange,
  onOrderChange,
  allowOrder,
  isLoading = false,
  ...rest
}) => {
  if (isLoading) {
    return <TablePlaceholder className={className} />;
  }

  let RowComponent = "div";
  if (href) {
    RowComponent = Link;
  }

  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <>
      <CardBackground className={className} {...rest}>
        <div
          className={classnames(
            "grid gap-3 text-white bg-gray-21 rounded-2xl font-medium text-sm px-5 py-3",
            gridColumnClassName
          )}
        >
          {columns.map((column, colIndex) => (
            <HeaderCell
              key={column.header || `col-${colIndex}`}
              align={column.headerAlign}
              orderField={column.orderField}
              currentOrder={currentOrder}
              onOrderChange={onOrderChange}
              allowOrder={allowOrder}
            >
              {column.header}
            </HeaderCell>
          ))}
        </div>
        <div className="mx-3">
          {data.map((row, index) => (
            <RowComponent
              key={row[keyField]}
              className={classnames(
                "block grid gap-3 border-b border-gray-20 px-2 last:border-b-0",
                gridColumnClassName,
                { "cursor-pointer hover:text-gray-7": !!href }
              )}
              href={_.isFunction(href) ? href(row) : href}
              prefetch={false}
            >
              {columns.map((column, colIndex) => (
                <div
                  key={`row-${row[keyField]}-${colIndex}`}
                  className={classnames(
                    "flex items-center py-4",
                    `justify-${column.cellAlign || "start"}`
                  )}
                >
                  <div
                    className={classnames(
                      "flex flex-col",
                      `items-${column.cellAlign || "start"}`
                    )}
                  >
                    <div className="flex">{column["cell"]({ row, index })}</div>
                    <div className="flex text-sm">
                      {column["smallCell"] ? column["smallCell"]({ row, index }) : null}
                    </div>
                  </div>
                </div>
              ))}
            </RowComponent>
          ))}
        </div>
      </CardBackground>
      {totalPages > 1 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-6"
        />
      ) : null}
    </>
  );
};

export default Table;
