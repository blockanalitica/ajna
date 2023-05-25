"use client";

import classnames from "classnames";
import _ from "lodash";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardBackground from "@/components/card/CardBackground";
import Pagination from "@/components/pagination/Pagination";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "@/hooks.js";
import Link from "next/link";
import HeaderCell from "./HeaderCell";

const Table = ({
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
  ...rest
}) => {
  let RowComponent = "div";
  if (href) {
    RowComponent = Link;
  }

  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div>
      <CardBackground {...rest}>
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
            >
              {columns.map((column, colIndex) => (
                <div
                  key={`row-${row[keyField]}-${colIndex}`}
                  className={classnames(
                    "flex items-center py-4",
                    `justify-${column.cellAlign || "start"}`
                  )}
                >
                  {column["cell"]({ row, index })}
                </div>
              ))}
            </RowComponent>
          ))}
        </div>
      </CardBackground>
      {totalPages > 1 ? (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-6"
        />
      ) : null}
    </div>
  );
};

export default Table;
