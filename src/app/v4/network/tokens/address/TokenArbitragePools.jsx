import { useState } from "react";
import { faPersonSwimming } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PoolName from "@/components/poolName/PoolName";

const TokenArbitragePools = ({ address, daysAgo, ...rest }) => {
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-collateral_token_underlying_price");
  const [expanded, setExpanded] = useState(false);

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/tokens/${address}/arbitrage-pools/`, {
    p: page,
    p_size: pageSize,
    order,
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const columns = [
    {
      header: "#",
      cell: ({ index }) => (
        <span className="font-syncopate text-gray-7">{index + 1}</span>
      ),
      cellSize: "0.2fr",
    },
    {
      header: "Collateral / Quote",
      cell: ({ row }) => (
        <PoolName
          collateralSymbol={row.collateral_token_symbol}
          collateralAddress={row.collateral_token_address}
          quoteSymbol={row.quote_token_symbol}
          quoteAddress={row.quote_token_address}
        />
      ),
      cellSize: "minmax(120px, auto)",
      sticky: true,
    },
    {
      header: "Market Price",
      cell: ({ row }) => (
        <Value value={row.collateral_token_underlying_price} prefix="$" />
      ),
      smallCell: ({ row }) => (
        <ValueChange
          value={
            row.collateral_token_underlying_price -
            row.prev_collateral_token_underlying_price
          }
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral_token_underlying_price",
    },
    {
      header: "LUP",
      cell: ({ row }) => <Value value={row.lup} />,
      smallCell: ({ row }) => <ValueChange value={row.lup - row.prev_lup} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "lup",
    },
    {
      header: "HTP",
      cell: ({ row }) => <Value value={row.htp} />,
      smallCell: ({ row }) => <ValueChange value={row.htp - row.prev_htp} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "htp",
    },
    {
      header: "HPB",
      cell: ({ row }) => <Value value={row.hpb} />,
      smallCell: ({ row }) => <ValueChange value={row.hpb - row.prev_hpb} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "hpb",
    },
  ];

  return (
    <section {...rest}>
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center mb-5 cursor-pointer hover:text-ajna-aqua"
      >
        <FontAwesomeIcon
          icon={expanded ? faChevronUp : faChevronDown}
          size="lg"
          className="mr-3"
        />
        <h1 className="text-xl md:text-1xl xl:text-2xl">Arbitrage Pools</h1>
        <span className="text-gray-13 font-medium ml-2">({count})</span>
      </div>
      {expanded ? (
        <Table
          data={results}
          keyField="address"
          columns={columns}
          linkTo={(row) => buildLink(`/pools/${row.address}`)}
          currentPage={page}
          pageSize={pageSize}
          totalRecords={count}
          onPageChange={setPage}
          onOrderChange={setOrder}
          currentOrder={order}
          isLoading={isLoading}
          emptyIcon={faPersonSwimming}
          emptyTitle="No Arbitrage Pools"
          emptyContent="There are no arbitrage pools"
        />
      ) : null}
    </section>
  );
};

export default TokenArbitragePools;
