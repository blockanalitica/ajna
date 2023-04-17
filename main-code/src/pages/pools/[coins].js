import {
  AnalyticSection,
  GraphSection,
  MiniGraphSection,
  SearchSection,
  Subtitle,
} from "@/sections";

const Coins = () => {
  return (
    <>
      <SearchSection showTimePicker={false} />
      <GraphSection />
      <Subtitle subtitle="Info" />
      <AnalyticSection />
      <MiniGraphSection />
      <Subtitle subtitle="Transactions" />
    </>
  );
};

export default Coins;
