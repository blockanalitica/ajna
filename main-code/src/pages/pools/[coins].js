import { AnalyticSection, GraphSection, SearchSection, MiniGraphSection, Subtitle } from '@/sections';

const Coins = () => {
    return (
      <>
        <SearchSection showMiddleButton={false} />
        <GraphSection />
        <Subtitle subtitle="Info" />
        <AnalyticSection />
        <MiniGraphSection />
        <Subtitle subtitle="Transactions" />
      </>
    );
};

export default Coins;