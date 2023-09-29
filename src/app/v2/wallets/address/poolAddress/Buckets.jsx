import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useQueryParams } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { shorten } from "@/utils/address";
import Select from "@/components/select/Select";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import ExternalLink from "@/components/externalLink/ExternalLink";
import EventFormatter from "@/components/events/EventFormatter";
import Value from "@/components/value/Value";

const Buckets = ({ address, poolAddress, quoteTokenSymbol, ...rest }) => {
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
        <Value
          value={row.bucket_price}
          suffix={quoteTokenSymbol}
          decimals={row.bucket_price < 1 ? 5 : 2}
        />
      ),
      smallCell: ({ row }) => <>Index: {row.bucket_index}</>,
    },
    {
      header: "Deposit",
      cell: ({ row }) => (
        <Value
          value={row.deposit}
          suffix={quoteTokenSymbol}
          decimals={row.deposit < 1 ? 5 : 2}
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
