import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "@/hooks";
import { shorten } from "@/utils/address";
import Info from "@/components/info/Info";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import ExternalLink from "@/components/externalLink/ExternalLink";
import {
  faArrowUpRightFromSquare,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";

const Page = () => {
  const { address } = useParams();
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-debt");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/borrowers/`, {
    p: page,
    p_size: pageSize,
    order,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const columns = [
    {
      header: "Borrower",
      cell: ({ row }) => (
        <>
          <ExternalLink
            href={generateEtherscanUrl(network, row.borrower)}
            className="ms-2 text-purple-6 hover:underline"
          >
            {shorten(row.borrower)}
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="ms-2"
              size="xs"
            />
          </ExternalLink>
        </>
      ),
      cellSize: "1.5fr",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <>
          <Value value={row.collateral} suffix={row.collateral_token_symbol} />
        </>
      ),
      smallCell: ({ row }) => <Value value={row.collateral_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
    },
    {
      header: "Debt",
      cell: ({ row }) => <Value value={row.debt} suffix={row.quote_token_symbol} />,
      smallCell: ({ row }) => <Value value={row.debt_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: (
        <>
          Health rate
          <Info className="ms-2" title="Health rate">
            LUP * collateral / debt
          </Info>
        </>
      ),
      cell: ({ row }) => <Value value={row.health_rate} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "health_rate",
    },
  ];

  const footerRow = (
    <div className="text-sm text-right">
      <ExternalLink
        href={`https://ajna-api.blockanalitica.com/v1/${network}/pools/${address}/borrowers-csv/`}
        className="ms-2 text-purple-6 hover:underline"
      >
        CSV
        <FontAwesomeIcon icon={faFileArrowDown} className="ms-2" />
      </ExternalLink>
    </div>
  );

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
      </section>
      <div className="flex mb-5">
        <h1 className="pl-4 text-2xl">Borrowers</h1>
      </div>
      <Table
        keyField="address"
        columns={columns}
        data={results}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        emptyTitle="No Borrowers"
        emptyContent="There are no borrowers"
        footerRow={footerRow}
      />
    </>
  );
};

export default Page;
