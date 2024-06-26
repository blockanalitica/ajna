import { useState } from "react";
import { useFetch, useLinkBuilder, useQueryParams } from "@/hooks";
import Table from "@/components/table/Table";
import { DateTime } from "luxon";
import Info from "@/components/info/Info";
import Address from "@/components/address/Address";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import PoolName from "@/components/poolName/PoolName";

const AtRisk = () => {
  const buildLink = useLinkBuilder();
  const { queryParams, setQueryParams } = useQueryParams();
  const change = parseInt(queryParams.get("change")) || -5;
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-price_change");

  const displaySwitchOptions = [
    { key: -5, value: "-5%" },
    { key: -10, value: "-10%" },
    { key: -50, value: "-50%" },
    { key: -80, value: "-80%" },
  ];

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/wallets/at-risk/", {
    p: page,
    p_size: pageSize,
    order,
    change,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ change: value });
  };

  const { results, count } = data;

  const columns = [
    {
      header: "Pool",
      cell: ({ row }) => (
        <PoolName
          collateralSymbol={row.collateral_token_symbol}
          collateralAddress={row.collateral_token_address}
          quoteSymbol={row.quote_token_symbol}
          quoteAddress={row.quote_token_address}
        />
      ),
      cellSize: "1.5fr",
    },
    {
      header: "Wallet",
      cell: ({ row }) => <Address address={row.wallet_address} />,
    },
    {
      header: (
        <span>
          Price Change
          <Info className="ms-2" title="Price Change">
            Percentage of how much the ratio of loans dept / collateral needs to drop
            before it&apos;s below LUP value at which point it means it&apos;s available
            to be liquidated.
          </Info>
        </span>
      ),
      cell: ({ row }) => (
        <Value value={row.price_change * 100} suffix="%" decimals={2} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "price_change",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.collateral}
          currencySymbol={row.collateral_token_symbol}
          currencyAddress={row.collateral_token_address}
        />
      ),
      smallCell: ({ row }) => <Value value={row.collateral_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
    },
    {
      header: "Debt",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.debt}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      smallCell: ({ row }) => <Value value={row.debt_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: (
        <span>
          TP
          <Info className="ms-2" title="Threshold Price (TP)">
            Threshold Price (TP) is the price at which the value of the collateral
            equals the value of the debt. By taking a loan’s debt and dividing it by the
            amount of collateral pledged, the loan’s threshold price, TP, can be
            calculated.
          </Info>
        </span>
      ),
      cell: ({ row }) => (
        <CurrencyValue
          value={row.threshold_price}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: (
        <span>
          LUP
          <Info className="ms-2" title="Lowest Utilized Price (LUP)">
            The LUP is the lowest price bucket where there is a utilized deposit. It
            could also be seen as the price of the marginal (lowest priced and therefore
            least aggressive) lender matched with a borrower.
          </Info>
        </span>
      ),
      cell: ({ row }) => (
        <CurrencyValue
          value={row.lup}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "lup",
    },
    {
      header: "Latest Activity",
      cell: ({ row }) => <DateTimeAgo dateTime={DateTime.fromISO(row.last_activity)} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "last_activity",
    },
  ];

  return (
    <>
      <div className="flex gap-x-3 items-center mb-10 justify-end">
        <DisplaySwitch
          options={displaySwitchOptions}
          onChange={onDisplaySwitchChange}
          activeOption={change}
        />
      </div>
      <Table
        data={results}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        keyField={(row) => `${row.pool_address}_${row.wallet_address}`}
        columns={columns}
        linkTo={(row) =>
          buildLink(`/wallets/${row.wallet_address}/${row.pool_address}`)
        }
        emptyTitle="No Wallets"
        emptyContent="There are no wallets"
      />
    </>
  );
};

export default AtRisk;
