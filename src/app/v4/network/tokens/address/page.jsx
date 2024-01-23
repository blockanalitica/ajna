import { useParams } from "react-router-dom";
import { useFetch, useQueryParams, usePageTitle } from "@/hooks";
import CryptoIcon from "@/components/icon/CryptoIcon";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Tag from "@/components/tags/Tag";
import Info from "@/components/info/Info";
import Value from "@/components/value/Value";
import TokenInfo from "./TokenInfo";
import TokenArbitragePools from "./TokenArbitragePools";
import TokenPools from "./TokenPools";

const TokenPage = () => {
  const { address } = useParams();

  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const { data = {}, error, isLoading } = useFetch(`/tokens/${address}/`);

  const { results: token } = data;

  usePageTitle(token ? token.symbol : "Token");

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <GenericPlaceholder />;
  }

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>
      <div className="flex mb-5">
        <CryptoIcon name={token.symbol} size="30" />
        <h1 className="ml-4 text-2xl">{token.symbol}</h1>
      </div>
      <div className="flex justify-between">
        <Tag className="flex mb-5">
          <CryptoIcon name={token.symbol} size="20" className="mr-1" />1 {token.symbol}
          <span className="px-1">=</span>
          <Value value={token.underlying_price} prefix="$" compact={false} />
          {token.is_estimated_price ? "*" : ""}
        </Tag>
        {token.is_estimated_price ? (
          <div className="text-xs text-gray-13 text-end mb-5">
            * price is an estimation
            <Info className="ms-2" title="USD Price">
              <p className="mb-2">
                USD price marked with * is an estimation as we couldn&apost fetch the
                actual price.
              </p>
              <p className="mb-2">
                We estimate the price based on the formula below from all the pools:
              </p>
              <code>MAX(LUP * &lt;quote token USD price&gt;)</code>
            </Info>
          </div>
        ) : null}
      </div>

      <TokenInfo address={address} daysAgo={daysAgo} className="mb-10" />
      <TokenPools address={address} daysAgo={daysAgo} className="mb-10" />
      <TokenArbitragePools address={address} daysAgo={daysAgo} />
    </>
  );
};

export default TokenPage;
