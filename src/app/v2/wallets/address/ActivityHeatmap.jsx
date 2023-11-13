import { useFetch, useMediaQuery } from "@/hooks";
import Heatmap from "@/components/heatmap/Heatmap";
import GenericPlaceholder from "@/components/GenericPlaceholder";

const ActivityHeatmap = ({ address, ...rest }) => {
  const isMediaSmall = useMediaQuery("sm");
  const isMediaLarge = useMediaQuery("lg");

  let daysAgo = 90;
  let monthsAgo = 3;

  if (isMediaLarge) {
    daysAgo = 365;
    monthsAgo = 12;
  } else if (isMediaSmall) {
    daysAgo = 180;
    monthsAgo = 6;
  }

  const {
    data = [],
    error,
    isLoading,
  } = useFetch(`/wallets/${address}/activity-heatmap/`, {
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  if (isLoading) {
    return <GenericPlaceholder />;
  }

  return (
    <div {...rest}>
      <Heatmap data={data} monthsAgo={monthsAgo} />
    </div>
  );
};

export default ActivityHeatmap;
