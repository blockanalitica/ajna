import { useFetch } from "@/hooks";
import Heatmap from "@/components/heatmap/Heatmap";
import GenericPlaceholder from "@/components/GenericPlaceholder";

const ActivityHeatmap = ({ address, ...rest }) => {
  const {
    data = [],
    error,
    isLoading,
  } = useFetch(`/wallets/${address}/activity-heatmap/`, {
    days_ago: 365,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  if (isLoading) {
    return <GenericPlaceholder />;
  }

  return (
    <div {...rest}>
      <Heatmap data={data} />
    </div>
  );
};

export default ActivityHeatmap;
