import { useParams } from "react-router-dom";
import { usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import { useFetch, useQueryParams } from "@/hooks";
import Address from "@/components/address/Address";
import { shorten } from "@/utils/address";
import WalletInfo from "../WalletInfo";
import Events from "../Events";
import Pools from "../Pools";

const TimeMachine = () => {
  const { address } = useParams();
  const { queryParams } = useQueryParams();
  const block = queryParams.get("block");

  const { data = {}, error, isLoading } = useFetch(`/wallets/${address}/`, { block });

  usePageTitle(`Wallet ${shorten(address)} on block ${block}`);

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
      </section>

      <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">
        Wallet <Address address={address} /> on block {block}
      </h1>
      <WalletInfo data={data} className="mb-5" />
      <Pools address={address} block={block} className="mb-5" />
      <Events address={address} block={block} />
    </>
  );
};

export default TimeMachine;
