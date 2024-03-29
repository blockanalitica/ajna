import { useFetch, useLinkBuilder } from "@/hooks";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "@/components/value/Value";
import ResultTable from "./ResultTable";
import { shortenText } from "@/utils/text";

const SearchResults = ({ searchTerm }) => {
  const buildLink = useLinkBuilder();
  const { data = {}, error, isLoading } = useFetch("/search/", { search: searchTerm });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { pools, tokens } = data;

  const poolColumns = [
    {
      header: <div className="font-syncopate uppercase">Pools</div>,
      cell: ({ row }) => (
        <>
          <span className="relative flex">
            <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={row.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          {row.collateral_token_symbol} / {row.quote_token_symbol}
        </>
      ),
    },
    {
      header: <span className="text-sm">TVL</span>,
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.tvl} prefix="$" />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  const tokenColumns = [
    {
      header: <div className="font-syncopate uppercase">Tokens</div>,
      cell: ({ row }) => (
        <>
          <CryptoIcon name={row.symbol} />
          <span className="ml-2">
            {shortenText(row.name, 40)}
            <span className="text-gray-13 ml-2">({row.symbol})</span>
          </span>
        </>
      ),
    },
    {
      header: <span className="text-sm">TVL</span>,
      cell: ({ row }) => <Value value={row.tvl} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  return (
    <div className="absolute left-[-50%] border border-gray-21 bg-gray-23 rounded-3xl mt-3 py-5 px-7 w-[500px]">
      <ResultTable
        data={pools}
        keyField="address"
        columns={poolColumns}
        gridColumnClassName="grid-cols-table-search-results"
        linkTo={(row) => buildLink(`/pools/${row.address}`)}
        isLoading={isLoading}
        emptyMessage="No pools"
      />
      <hr className="bg-gray-20 h-px border-0 mb-5 mt-3" />
      <ResultTable
        data={tokens}
        keyField="underlying_address"
        columns={tokenColumns}
        gridColumnClassName="grid-cols-table-search-results"
        linkTo={(row) => buildLink(`/tokens/${row.underlying_address}`)}
        isLoading={isLoading}
        emptyMessage="No tokens"
      />
    </div>
  );
};

export default SearchResults;
