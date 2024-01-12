import { useParams } from "react-router-dom";
import { useState } from "react";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Address from "@/components/address/Address";
import Value from "@/components/value/Value";

const Depositors = ({ searchTerm, ...rest }) => {
  const { address, index } = useParams();
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-deposit");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/buckets/${index}/depositors/`, {
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
      header: "Wallet",
      cell: ({ row }) => <Address address={row.wallet_address} />,
      orderField: "wallet_address",
    },
    {
      header: "Deposit",
      cell: ({ row }) => <Value value={row.deposit} prefix="$" />,

      headerAlign: "end",
      cellAlign: "end",
      orderField: "deposit",
    },
  ];

  return (
    <div {...rest}>
      <Table
        data={results}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        keyField="wallet_address"
        columns={columns}
        linkTo={(row) => buildLink(`/wallets/${row.wallet_address}`)}
        emptyTitle="No Wallets"
        emptyContent="There are no wallets"
      />
    </div>
  );
};

export default Depositors;
