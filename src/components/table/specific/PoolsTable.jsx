import { useState } from "react";
import { faWaterLadder } from "@fortawesome/free-solid-svg-icons";
import { useLinkBuilder } from "@/hooks";
import InlineSelect from "@/components/select/InlineSelect";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import Tag from "@/components/tags/Tag";
import PoolName from "@/components/poolName/PoolName";

const PoolsTable = ({ currentPage = 1, pageSize = 10, ...rest }) => {
  const buildLink = useLinkBuilder();
  const [isPriceUsd, setIsPriceUsd] = useState(false);
  const columns = [
    {
      header: "#",
      cell: ({ index }) => (
        <span className="font-syncopate text-gray-7">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
      cellSize: "0.2fr",
    },
    {
      header: "Collateral / Quote",
      cell: ({ row }) => (
        <PoolName
          collateralSymbol={row.collateral_token_symbol}
          quoteSymbol={row.quote_token_symbol}
        />
      ),
      smallCell: ({ row }) => (
        <>
          {row.erc === "erc721" ? (
            <Tag size="xs" className="ms-9">
              NFT{" "}
              <span className="hidden lg:inline">
                {row.allowed_token_ids?.length > 0 ? "Subset" : "Collection"} Pool
              </span>
            </Tag>
          ) : null}
        </>
      ),
      cellSize: "minmax(120px, auto)",
      sticky: true,
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.pledged_collateral_usd} prefix="$" />
          ) : (
            <Value
              value={row.pledged_collateral}
              suffix={row.collateral_token_symbol}
            />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange
              value={row.pledged_collateral_usd - row.prev_pledged_collateral_usd}
              prefix="$"
            />
          ) : (
            <ValueChange
              value={row.pledged_collateral - row.prev_pledged_collateral}
              suffix={row.collateral_token_symbol}
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: isPriceUsd ? "pledged_collateral_usd" : "pledged_collateral",
    },
    // {
    //   header: "Collateral",
    //   cell: ({ row }) => (
    //     <>
    //       {isPriceUsd ? (
    //         <Value value={row.collateral_usd} prefix="$" />
    //       ) : (
    //         <Value value={row.collateral} suffix={row.collateral_token_symbol} />
    //       )}
    //     </>
    //   ),
    //   smallCell: ({ row }) => (
    //     <>
    //       {isPriceUsd ? (
    //         <ValueChange
    //           value={row.collateral_usd - row.prev_collateral_usd}
    //           prefix="$"
    //         />
    //       ) : (
    //         <ValueChange
    //           value={row.collateral - row.prev_collateral}
    //           suffix={row.collateral_token_symbol}
    //         />
    //       )}
    //     </>
    //   ),
    //   headerAlign: "end",
    //   cellAlign: "end",
    //   orderField: isPriceUsd ? "collateral_usd" : "collateral",
    // },

    {
      header: "Quote",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.pool_size_usd} prefix="$" />
          ) : (
            <Value value={row.pool_size} suffix={row.quote_token_symbol} />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange
              value={row.pool_size_usd - row.prev_pool_size_usd}
              prefix="$"
            />
          ) : (
            <ValueChange
              value={row.pool_size - row.prev_pool_size}
              suffix={row.quote_token_symbol}
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: isPriceUsd ? "pool_size_usd" : "pool_size",
    },
    {
      header: "Debt",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.debt_usd} prefix="$" />
          ) : (
            <Value value={row.debt} suffix={row.quote_token_symbol} />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange value={row.debt_usd - row.prev_debt_usd} prefix="$" />
          ) : (
            <ValueChange
              value={row.debt - row.prev_debt}
              suffix={row.quote_token_symbol}
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: isPriceUsd ? "debt_usd" : "debt",
    },
    {
      header: "TVL",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.tvl} prefix="$" dashIfZero />
          <ValueChange value={row.tvl - row.prev_tvl} small prefix={"$"} />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "tvl",
    },
    {
      header: "Lend APR",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.lend_rate * 100} suffix="%" />
          <ValueChange
            value={(row.lend_rate - row.prev_lend_rate) * 100}
            small
            suffix={"%"}
          />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "lend_rate",
    },
    {
      header: "Borrow APR",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.borrow_rate * 100} suffix="%" />
          <ValueChange
            value={(row.borrow_rate - row.prev_borrow_rate) * 100}
            small
            suffix={"%"}
          />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "borrow_rate",
    },
    {
      header: "🔥",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.total_ajna_burned} suffix="AJNA" />
          <ValueChange
            value={row.total_ajna_burned - row.prev_total_ajna_burned}
            small
          />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "total_ajna_burned",
      cellSize: "0.5fr",
    },
  ];

  const priceOptions = [
    { key: "token", value: "Token" },
    { key: "usd", value: "USD" },
  ];

  const onPriceOptionChange = (event) => {
    setIsPriceUsd(event.target.value === "usd");
  };

  const footerRow = (
    <div className="text-sm text-right">
      Prices shown in{" "}
      <InlineSelect
        options={priceOptions}
        value={isPriceUsd ? "usd" : "token"}
        onChange={onPriceOptionChange}
      />
    </div>
  );
  return (
    <Table
      keyField="address"
      columns={columns}
      linkTo={(row) => buildLink(`pools/${row.address}`)}
      footerRow={footerRow}
      currentPage={currentPage}
      pageSize={pageSize}
      emptyIcon={faWaterLadder}
      emptyTitle="No Pools"
      emptyContent="There are no pools"
      {...rest}
    />
  );
};

export default PoolsTable;
