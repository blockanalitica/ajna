import {
  faCheckCircle,
  faCircleXmark,
  faBucket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { useFetch } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import SearchInput from "@/components/search/SearchInput";
import PoolName from "@/components/poolName/PoolName";

const Buckets = () => {
  const { address } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-bucket_price");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/buckets/list/`, {
    p: page,
    p_size: pageSize,
    order,
    search: searchTerm,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const {
    results,
    count,
    collateral_token_symbol: collateralTokenSymbol,
    quote_token_symbol: quoteTokenSymbol,
  } = data;

  const columns = [
    {
      header: "#",
      cell: ({ row }) => (
        <span className="font-syncopate text-gray-7">{row.bucket_index}</span>
      ),
      orderField: "bucket_index",
      cellSize: "minmax(80px, auto)",
      sticky: true,
    },
    {
      header: "Bucket Price",
      cell: ({ row }) => (
        <Value value={row.bucket_price} suffix={row.quote_token_symbol} />
      ),
      smallCell: ({ row }) => (
        <Value value={row.bucket_price * row.quote_token_underlying_price} prefix="$" />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "bucket_price",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <Value value={row.collateral} suffix={row.collateral_token_symbol} />
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.collateral * row.collateral_token_underlying_price}
          prefix="$"
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
    },
    {
      header: "Quote",
      cell: ({ row }) => <Value value={row.deposit} suffix={row.quote_token_symbol} />,
      smallCell: ({ row }) => (
        <Value value={row.deposit * row.quote_token_underlying_price} prefix="$" />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "deposit",
    },
    {
      header: "Utilized Bucket",
      cell: ({ row }) =>
        row.is_utilized ? (
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-8" />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} className="text-red-8" />
        ),
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  return (
    <>
      <section className="mb-10">
        <Breadcrumbs />
      </section>
      <div className="flex flex-col items-center sm:flex-row justify-between">
        <div className="flex flex-col sm:flex-row items-center mb-5">
          {isLoading ? null : (
            <PoolName
              collateralSymbol={collateralTokenSymbol}
              quoteSymbol={quoteTokenSymbol}
              size="xl"
              className="font-syncopate"
            />
          )}
          <div className="text-2xl font-syncopate uppercase pl-3">Buckets</div>
        </div>

        <SearchInput
          placeholder="Search bucket by index "
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-5"
        />
      </div>

      <Table
        data={results}
        keyField="bucket_index"
        columns={columns}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        emptyIcon={faBucket}
        emptyTitle="No Buckets"
        emptyContent="There are no buckets"
        placeholderRows={pageSize}
        linkTo={(row) => String(row.bucket_index)}
      />
    </>
  );
};

export default Buckets;
