import classnames from "classnames";
import Link from "next/link";
import React from "react";

const GeneralTable = ({
  tableData,
  tableHeader,
  rowData,
  idxDisplay = false,
  colClass = "grid-cols-4",
}) => {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-x-auto border rounded-2xl bg-gray-20 bg-opacity-30 border-gray-13 border-opacity-30 px-5">
        <div className="relative overflow-x-auto shadow-md rounded-2xl">
          <div className="shadow overflow-hidden sm:rounded-lg py-4">
            <div
              className={classnames(
                "grid gap-4 bg-gray-21  text-white rounded-2xl",
                colClass
              )}
            >
              {tableHeader.map((item, index) => (
                <div
                  key={index}
                  className={classnames("bg-gray-100 flex font-bold p-4", item.class)}
                >
                  {item.title}
                </div>
              ))}
            </div>
            {tableData.map((item, index) => (
              <Link
                key={index}
                className="text-white cursor-pointer hover:text-gray-7"
                href={`/pools/${item.address}`}
                alt="link"
              >
                <div
                  className={classnames("grid px-2 border-b border-gray-20", colClass)}
                >
                  {idxDisplay && (
                    <div className="flex justify-start items-center p-4">
                      {index + 1}
                    </div>
                  )}
                  {rowData(item).map((tab, tab_idx) => (
                    <React.Fragment key={`tab-${tab_idx}`}>{tab}</React.Fragment>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTable;
