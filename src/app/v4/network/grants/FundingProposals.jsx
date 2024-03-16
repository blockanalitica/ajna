import { useState } from "react";
import { useFetch } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";

const FundingProposals = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const {
    data = [],
    error,
    isLoading,
  } = useFetch("/grants/", { p: page, p_size: pageSize, type: "funding" });

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
      header: "Title",
      cell: ({ row }) => <>{row.description.title}</>,
      cellSize: "3fr",
    },
    {
      header: "Screening Votes",
      cell: ({ row }) => <Value value={row.screening_votes_received} />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Amount requested",
      cell: ({ row }) => <Value value={row.total_tokens_requested} suffix="AJNA" />,
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  return (
    <Table
      data={results}
      isLoading={isLoading}
      keyField="uid"
      columns={columns}
      emptyTitle="No Proposals"
      emptyContent="There are no proposals"
      currentPage={page}
      pageSize={pageSize}
      totalRecords={count}
      onPageChange={setPage}
      linkTo={(row) => `https://grants.ajnafi.com/proposal/${row.proposal_id}`}
    />
  );
};

export default FundingProposals;
