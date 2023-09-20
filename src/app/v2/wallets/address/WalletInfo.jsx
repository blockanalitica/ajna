"use client";

import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stats from "@/components/stats/Stats";
import Value from "@/components/value/Value";

const WalletInfo = ({ data, ...rest }) => {
  const stats = [
    {
      title: "Deposited",
      value: (
        <>
          <Value value={data.supply_usd} prefix="$" big />
          {/* <ValueChange */}
          {/*   value={data.pool_size - data.prev_pool_size} */}
          {/*   suffix={data.quote_token_symbol} */}
          {/*   className="text-lg" */}
          {/* /> */}
        </>
      ),
      // smallValue: (
      //   <>
      //     <Value value={data.pool_size_usd} prefix="$" />
      //     <ValueChange
      //       value={data.pool_size_usd - data.prev_pool_size_usd}
      //       prefix="$"
      //       className="ms-2"
      //     />
      //   </>
      // ),
    },
    {
      title: "Borrowed",
      value: (
        <>
          <Value value={data.debt_usd} prefix="$" big />
          {/* <ValueChange */}
          {/*   value={data.debt - data.prev_debt} */}
          {/*   suffix={data.quote_token_symbol} */}
          {/*   className="text-lg" */}
          {/* /> */}
        </>
      ),
      // smallValue: (
      //   <>
      //     <Value value={data.debt_usd} prefix="$" />
      //     <ValueChange
      //       value={data.debt_usd - data.prev_debt_usd}
      //       prefix="$"
      //       className="ms-2"
      //     />
      //   </>
      // ),
    },
    {
      title: "Collateral",
      value: (
        <>
          <Value value={data.collateral_usd} prefix="$" big />
          {/* <ValueChange */}
          {/*   value={data.pledged_collateral - data.prev_pledged_collateral} */}
          {/*   suffix={data.collateral_token_symbol} */}
          {/*   className="text-lg" */}
          {/* /> */}
        </>
      ),
      // smallValue: (
      //   <>
      //     <Value value={data.pledged_collateral_usd} prefix="$" />
      //     <ValueChange
      //       value={data.pledged_collateral_usd - data.prev_pledged_collateral_usd}
      //       prefix="$"
      //       className="ms-2"
      //     />
      //   </>
      // ),
    },
    {
      title: "Health Rate",
      value: (
        <>
          <>
            {data.health_rate ? (
              <Value value={data.health_rate} decimals={3} big />
            ) : (
              <FontAwesomeIcon icon={faInfinity} />
            )}
          </>
          {/* <ValueChange */}
          {/*   value={data.pledged_collateral - data.prev_pledged_collateral} */}
          {/*   suffix={data.collateral_token_symbol} */}
          {/*   className="text-lg" */}
          {/* /> */}
        </>
      ),
      // smallValue: (
      //   <>
      //     <Value value={data.pledged_collateral_usd} prefix="$" />
      //     <ValueChange
      //       value={data.pledged_collateral_usd - data.prev_pledged_collateral_usd}
      //       prefix="$"
      //       className="ms-2"
      //     />
      //   </>
      // ),
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default WalletInfo;
