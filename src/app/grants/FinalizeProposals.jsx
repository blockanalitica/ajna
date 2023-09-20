"use client";

import { useFetch } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";

const FinalizeProposals = () => {
  const { data = [], error, isLoading } = useFetch("/grants/finalize-proposals/");

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
      cell: ({ row }) => <>{row.title}</>,
      cellSize: "3fr",
    },
    {
      header: "Screening Votes",
      cell: ({ row }) => <Value value={row.screening_votes_received} />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Funding Votes",
      cell: ({ row }) => <Value value={row.funding_votes_received} />,
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
      data={data}
      isLoading={isLoading}
      keyField="uid"
      columns={columns}
      emptyTitle="No Proposals"
      emptyContent="There are no proposals"
    />
  );
};

export default FinalizeProposals;
