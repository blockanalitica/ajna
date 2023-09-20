import { useParams } from "react-router-dom";
import { usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import { useFetch } from "@/hooks";
import { shorten } from "@/utils/address";
import WalletInfo from "./WalletInfo";
import Events from "./Events";
import Pools from "./Pools";
import WalletAdditionalInfo from "./WalletAdditionalInfo";

const Wallet = () => {
  const { address } = useParams();

  const { data = {}, error, isLoading } = useFetch(`/wallets/${address}/`);

  usePageTitle(`Wallet ${shorten(address)}`);

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
        Wallet {shorten(address)}
      </h1>
      <WalletInfo data={data} className="mb-5" />

      <Pools address={address} className="mb-5" />
      <WalletAdditionalInfo data={data} className="mb-5" />
      <Events address={address} />
    </>
  );
};

export default Wallet;
