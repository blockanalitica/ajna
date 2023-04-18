import AnalyticCard from '@/components/card/AnalyticCard';

const analytics = [
  { value: 15000000, subtitle: 'Total lended' },
  { value: 5000000, subtitle: 'Total borowed' },
    { value: 1000000, subtitle: 'TVL' },
    
    { value: 200000, subtitle: 'Volume 24h' },
    { value: 3100, subtitle: 'Ajna burned 24h' },
    
]
  

const AnalyticSection = () => (
  <section className="mx-auto max-w-9xl py-10 px-4 sm:px-6 lg:px-8">
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-7">
        {analytics.map((item, key) => (
            <AnalyticCard key={key} value={item.value} subtitle={item.subtitle} />
        ))}
      </div> 
  </section>
);

export default AnalyticSection;