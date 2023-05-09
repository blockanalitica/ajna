import { joinClassNames } from "@/utils/helperFunc"; // This is a custom function to join class names
import Link from "next/link";

const GeneralTable = ({ tableData, tableHeader, rowData, colClass="grid-cols-4" }) => {
    return (
    <div className="flex flex-col">
      <div className="relative overflow-x-auto border rounded-2xl bg-gray-20 bg-opacity-30 border-gray-13 border-opacity-30 px-5">
        <div className="relative overflow-x-auto shadow-md rounded-2xl">
          <div className="shadow overflow-hidden sm:rounded-lg py-4">
            <div 
              className={joinClassNames(
                "grid gap-4 bg-gray-21  text-white rounded-2xl",
                colClass
              )}>
              {tableHeader.map((item, index) => (
                <div key={index} className={joinClassNames("bg-gray-100 flex font-bold p-4", item.class)}>{item.title}</div>
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
                  className={joinClassNames(
                    "grid px-2 border-b border-gray-20",
                    colClass
                  )}
                >
                  <div className="flex justify-start items-center p-4">
                    {index + 1}
                  </div>
                  
                  {rowData(item).map((tab, tab_idx) => (
                    <>{tab}</>
                  ))}
                </div>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </div>
    )
}

export default GeneralTable


