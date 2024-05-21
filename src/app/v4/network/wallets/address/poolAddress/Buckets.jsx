import { useState } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "@/hooks";
import Table from "@/components/table/Table";
import CurrencyValue from "@/components/value/CurrencyValue";

const Buckets = ({ address, poolAddress, quoteTokenSymbol, quoteTokenAddress }) => {
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/wallets/${address}/pools/${poolAddress}/buckets/`, {
    p: page,
    p_size: pageSize,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const columns = [
    {
      header: "Price",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.bucket_price}
          currencySymbol={quoteTokenSymbol}
          currencyAddress={quoteTokenAddress}
        />
      ),
      smallCell: ({ row }) => <>Index: {row.bucket_index}</>,
    },
    {
      header: "Deposit",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.deposit}
          currencySymbol={quoteTokenSymbol}
          currencyAddress={quoteTokenAddress}
        />
      ),
    },
  ];

  return (
    <>
      <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Buckets</h1>
      <Table
        data={results}
        keyField="bucket_index"
        columns={columns}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        isLoading={isLoading}
        emptyIcon={faCalendarDays}
        emptyTitle={`No Buckets`}
        emptyContent="There are no buckets"
        placeholderRows={pageSize}
      />
    </>
  );
};

export default Buckets;
