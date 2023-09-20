import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "@/hooks";
import { shorten } from "@/utils/address";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import ExternalLink from "@/components/externalLink/ExternalLink";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
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
  const [order, setOrder] = useState("-bucket_price");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/lenders/`, {
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
      header: "Lender",
      cell: ({ row }) => (
        <>
          <ExternalLink
            href={generateEtherscanUrl(network, row.lender)}
            className="ms-2 text-purple-6 hover:underline"
          >
            {shorten(row.lender)}
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="ms-2"
              size="xs"
            />
          </ExternalLink>
        </>
      ),
      cellSize: "1.5fr",
      orderField: "lender",
    },

    {
      header: "Bucket",
      cell: ({ row }) => <Value value={row.bucket_price} suffix={row.token_symbol} />,
      smallCell: ({ row }) => row.bucket_index,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "bucket_price",
    },
    {
      header: "Amount",
      cell: ({ row }) => <Value value={row.amount} suffix={row.token_symbol} />,
      smallCell: ({ row }) => <Value value={row.amount_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "amount",
    },
  ];

  const footerRow = (
    <div className="text-sm text-right">
      <ExternalLink
        href={`https://ajna-api.blockanalitica.com/v1/${network}/pools/${address}/lenders-csv/`}
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
        <h1 className="pl-4 text-2xl">Lenders</h1>
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
        emptyTitle="No Lenders"
        emptyContent="There are no lenders"
        footerRow={footerRow}
      />
    </>
  );
};

export default Page;
