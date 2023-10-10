import { useParams } from "react-router-dom";
import { usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import { useFetch, useQueryParams } from "@/hooks";
import { shorten } from "@/utils/address";
import Address from "@/components/address/Address";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import WalletInfo from "./WalletInfo";
import Events from "./Events";
import Pools from "./Pools";
import WalletAdditionalInfo from "./WalletAdditionalInfo";

const Wallet = () => {
  const { address } = useParams();
  const { queryParams, setQueryParams } = useQueryParams();
  const block = queryParams.get("block");
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/wallets/${address}/`, { block, days_ago: daysAgo });

  usePageTitle(`Wallet ${shorten(address)}`);

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <GenericPlaceholder />;
  }

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>

      <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">
        Wallet <Address address={address} />
      </h1>
      <WalletInfo data={data} className="mb-5" />

      <Pools address={address} block={block} daysAgo={daysAgo} className="mb-5" />
      <WalletAdditionalInfo data={data} className="mb-5" />
      <Events address={address} block={block} />
    </>
  );
};

export default Wallet;
