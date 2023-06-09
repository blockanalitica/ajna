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
  footerRow,
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
    <div className={className}>
      <CardBackground className="p-0" {...rest}>
        <div
          className={classnames(
            "grid gap-3 text-gray-4 border-b border-gray-19 text-sm px-9 py-5",
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
        <div className="mx-5">
          {data.map((row, index) => (
            <RowComponent
              key={row[keyField]}
              className={classnames(
                "block grid gap-3 border-b border-gray-20 px-4 ",
                gridColumnClassName,
                {
                  "cursor-pointer hover:text-gray-7": !!href,
                  "last:border-b-0": !footerRow,
                }
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
                    <div className="flex text-sm text-gray-6">
                      {column["smallCell"] ? column["smallCell"]({ row, index }) : null}
                    </div>
                  </div>
                </div>
              ))}
            </RowComponent>
          ))}
        </div>
        {footerRow ? <div className="px-9 py-5 text-gray-7">{footerRow}</div> : null}
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
