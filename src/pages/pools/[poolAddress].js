import {
  AnalyticSection,
  GraphSection,
  MiniGraphSection,
  SearchSection,
  Subtitle,
} from "@/sections";

const Pool = () => {
  return (
    <>
      <SearchSection showTimePicker={true} />
      <GraphSection />
      <Subtitle subtitle="Info" />
      <AnalyticSection />
      <MiniGraphSection />
      <Subtitle subtitle="Transactions" />
    </>
  );
};

export default Pool;
