"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "@/hooks";
import { shorten } from "@/utils/address";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { generateEtherscanUrl } from "@/utils/urls";

const Page = ({ params }) => {
  const { network } = useParams();
  const { address } = params;
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
      header: "#",
      cell: ({ index }) => (
        <span className="font-syncopate text-gray-7">{index + 1}</span>
      ),
      cellSize: "0.2fr",
    },
    {
      header: "Collateral / Quote",
      cell: ({ row }) => (
        <>
          <a
            href={generateEtherscanUrl(network, row.borrower)}
            target="_blank"
            className="ms-2 text-purple-6 hover:underline"
          >
            {shorten(row.borrower)}
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="ms-2"
              size="xs"
            />
          </a>
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
      cell: ({ row }) => (
        <Value value={row.debt < 0 ? 0 : row.debt} suffix={row.quote_token_symbol} />
      ),
      smallCell: ({ row }) => (
        <Value value={row.debt_usd < 0 ? 0 : row.debt_usd} prefix="$" />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: "Health rate",
      cell: ({ row }) => <Value value={row.health_rate < 0 ? 0 : row.health_rate} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "health_rate",
    },
  ];

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
      />
    </>
  );
};

export default Page;
