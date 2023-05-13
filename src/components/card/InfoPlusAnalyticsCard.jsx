import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "@/components/value/Value";
import SubAnalyticCard from "./SubAnalyticCard";

const InfoPlusAnalyticsCard = (promps) => {
  const { data } = promps;
  return (
    <div className="grid grid-cols-1 place-content-between w-full  bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 p-7 rounded-3xl">
      <div>
        <h3 className="text-xl font-syncopate uppercase text-white mb-4">
          Total tokens locked
        </h3>
        <div className="text-xl">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center">
              <CryptoIcon
                name={data.collateral_token_symbol}
                size={"20"}
                className="mr-2"
              />{" "}
              {data.collateral_token_symbol}{" "}
            </div>
            <div className="flex flex-row justify-between items-center">
              <Value value={data.pledged_collateral} decimals={2} compact />
              <span className="text-sm text-gray-5 ml-2">
                <Value
                  value={
                    data.pledged_collateral * data.collateral_token_underlying_price
                  }
                  decimals={2}
                  compact
                  prefix={"$"}
                />
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center">
              <CryptoIcon name={data.quote_token_symbol} size={20} className="mr-2" />{" "}
              {data.quote_token_symbol}{" "}
            </div>
            <div className="flex flex-row justify-between items-center">
              <Value value={data.pool_size - data.current_debt} decimals={2} compact />
              <span className="text-sm text-gray-5 ml-2">
                <Value
                  value={
                    (data.pool_size - data.current_debt) *
                    data.quote_token_underlying_price
                  }
                  decimals={2}
                  compact
                  prefix={"$"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <SubAnalyticCard
          title={<Value value={data.tvl} decimals={2} compact prefix={"$"} />}
          subtitle="TVL"
          info="0.18%"
        />
        <SubAnalyticCard
          title={<Value value={0} decimals={2} compact prefix={"$"} />}
          subtitle="Volume"
          info="1.97%"
        />
        <SubAnalyticCard
          title={<Value value={0} decimals={2} compact prefix={"$"} />}
          subtitle="Fees"
        />
        <SubAnalyticCard
          title={
            <Value value={data.total_ajna_burned} decimals={2} compact prefix={"🔥 "} />
          }
          subtitle="AJNA burned"
        />
      </div>
    </div>
  );
};

export default InfoPlusAnalyticsCard;
