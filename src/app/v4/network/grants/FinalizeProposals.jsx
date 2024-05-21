import { useFetch } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import { AJNA_TOKEN_ADDRESS } from "@/utils/constants";

const FinalizeProposals = () => {
  const { data = [], error, isLoading } = useFetch("/grants/", { type: "finalize" });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const columns = [
    {
      header: "#",
      cell: ({ index }) => (
        <span className="font-syncopate text-gray-7">{index + 1}</span>
      ),
      cellSize: "0.2fr",
    },
    {
      header: "Title",
      cell: ({ row }) => <>{row.description.title}</>,
      smallCell: ({ row }) => (
        <div className="d-flex">
          Requested:{" "}
          <CurrencyValue
            value={row.total_tokens_requested}
            currencySymbol="AJNA"
            currencyAddress={AJNA_TOKEN_ADDRESS}
            network="ethereum"
          />
        </div>
      ),
      cellSize: "3fr",
    },
    {
      header: "Screening Votes",
      cell: ({ row }) => <Value value={row.screening_votes_received} />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Votes For",
      cell: ({ row }) => <Value value={row.funding_votes_positive} />,
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  return (
    <Table
      data={data}
      isLoading={isLoading}
      keyField="proposal_id"
      columns={columns}
      emptyTitle="No Proposals"
      emptyContent="There are no proposals"
      linkTo={(row) => `https://grants.ajnafi.com/proposal/${row.proposal_id}`}
    />
  );
};

export default FinalizeProposals;
