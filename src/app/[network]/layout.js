import { NETWORKS } from "@/networks";
import { notFound } from "next/navigation";

const Layout = ({ params, children }) => {
  const { network } = params;

  const isValidNetwork = NETWORKS.map((n) => n.key).includes(network);

  if (!isValidNetwork) {
    notFound();
  }

  return <>{children}</>;
};

export default Layout;
