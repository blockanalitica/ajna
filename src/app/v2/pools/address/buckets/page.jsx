import {
  faCheckCircle,
  faCircleXmark,
  faBucket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useState } from "react";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { useFetch } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import SearchInput from "@/components/search/SearchInput";

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
      cellSize: "0.2fr",
    },
    {
      header: "Bucket Price",
      cell: ({ row }) => (
        <Value
          value={row.bucket_price}
          suffix={row.quote_token_symbol}
          decimals={row.bucket_price < 1 ? 5 : 2}
        />
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.bucket_price * row.quote_token_underlying_price}
          prefix="$"
          decimals={row.bucket_price * row.quote_token_underlying_price < 1 ? 5 : 2}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "bucket_price",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <Value
          value={row.collateral}
          suffix={row.collateral_token_symbol}
          decimals={row.collateral < 1 ? 5 : 2}
        />
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.collateral * row.collateral_token_underlying_price}
          prefix="$"
          decimals={row.collateral * row.collateral_token_underlying_price < 1 ? 5 : 2}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
      visibleAfter: "md",
    },
    {
      header: "Quote",
      cell: ({ row }) => (
        <Value
          value={row.deposit}
          suffix={row.quote_token_symbol}
          decimals={row.deposit < 1 ? 5 : 2}
        />
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.deposit * row.quote_token_underlying_price}
          prefix="$"
          decimals={row.deposit * row.quote_token_underlying_price < 1 ? 5 : 2}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "deposit",
      visibleAfter: "md",
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
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
      </section>
      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          {collateralTokenSymbol && quoteTokenSymbol ? (
            <>
              <span className="relative flex">
                <CryptoIcon name={collateralTokenSymbol} className="z-10" />
                <CryptoIcon
                  name={quoteTokenSymbol}
                  className="relative left-[-10px] z-0"
                />
              </span>

              <h1 className="pl-4 text-2xl">
                {collateralTokenSymbol} / {quoteTokenSymbol} Buckets
              </h1>
            </>
          ) : null}
        </div>
        <SearchInput
          placeholder="Search bucket by index"
          value={searchTerm}
          onChange={handleSearchChange}
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
