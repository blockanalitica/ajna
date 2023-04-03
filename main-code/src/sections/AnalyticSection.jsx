import PrimaryButton from '@/components/button/PrimaryButton';
import AnalyticCard from '@/components/card/AnalyticCard';
import MiningCard from '@/components/card/MiningCard';
import styles from '../styles';

const analytics = [
    { title: '1.5%', subtitle: 'Lending APR' },
    { title: '3.75%', subtitle: 'Borrowing APR' },
    { title: '1,530', subtitle: 'Lowest Utilized Price' },
    { title: '1,530', subtitle: 'Highest Threshold Price' },
    { title: '1,180', subtitle: 'Highest Threshold Price' },
]
  

const AnalyticSection = () => (
    <>
  <section className={` sm:pl-16 pl-6`}>
    <div className="grid max-w-screen-2xl px-4 py-8 lg:py-16 ">      
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-7">
        {analytics.map((item) => (
            <AnalyticCard title={item.title} subtitle={item.subtitle} />
        ))}
      </div>                
    </div>
</section>
    </>
);

export default AnalyticSection;