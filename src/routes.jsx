import { Routes, Route } from "react-router-dom";
import { NETWORKS } from "@/networks";
import SimpleRedirect from "@/components/simpleRedirect/SimpleRedirect";
import Layout from "@/app/layout";
import Error404 from "@/app/404";
import Homepage from "@/app/page";
import Pools from "@/app/pools/page";
import Pool from "@/app/pools/address/page";
import PoolBorrowers from "@/app/pools/address/borrowers/page";
import PoolLenders from "@/app/pools/address/lenders/page";
import Tokens from "@/app/tokens/page";
import Token from "@/app/tokens/address/page";
import Auctions from "@/app/auctions/page";
import Grants from "@/app/grants/page";
import V2Homepage from "@/app/v2/page";
import V2Pools from "@/app/v2/pools/page";
import V2Pool from "@/app/v2/pools/address/page";
import PoolWallets from "@/app/v2/pools/address/positions/page";
import V2Tokens from "@/app/v2/tokens/page";
import V2Token from "@/app/v2/tokens/address/page";
import Wallets from "@/app/v2/wallets/page";
import Wallet from "@/app/v2/wallets/address/page";
import TimeMachine from "@/app/v2/wallets/address/time-machine/page";
import WalletPoolPosition from "@/app/v2/wallets/address/poolAddress/page";
import Buckets from "@/app/v2/pools/address/buckets/page";
import Bucket from "@/app/v2/pools/address/buckets/index/page";
import V2Auctions from "@/app/v2/auctions/page";
import Auction from "@/app/v2/auctions/auction_uid/page";

const AjnaRoutes = () => {
  const routes = {
    v1: [
      { path: "", element: <Homepage /> },
      { path: "/pools", element: <Pools /> },
      { path: "/pools/:address", element: <Pool /> },
      { path: "/pools/:address/borrowers", element: <PoolBorrowers /> },
      { path: "/pools/:address/lenders", element: <PoolLenders /> },
      { path: "/tokens", element: <Tokens /> },
      { path: "/tokens/:address", element: <Token /> },
      { path: "/auctions", element: <Auctions /> },
      { path: "/grants", element: <Grants /> },
    ],
    v2: [
      { path: "", element: <V2Homepage /> },
      { path: "/pools", element: <V2Pools /> },
      { path: "/pools/:address", element: <V2Pool /> },
      { path: "/pools/:address/positions", element: <PoolWallets /> },
      { path: "/pools/:address/buckets", element: <Buckets /> },
      { path: "/pools/:address/buckets/:index", element: <Bucket /> },
      { path: "/tokens", element: <V2Tokens /> },
      { path: "/tokens/:address", element: <V2Token /> },
      { path: "/wallets", element: <Wallets /> },
      { path: "/wallets/:address", element: <Wallet /> },
      { path: "/wallets/:address/time-machine", element: <TimeMachine /> },
      { path: "/wallets/:address/:poolAddress", element: <WalletPoolPosition /> },
      { path: "/auctions", element: <V2Auctions /> },
      { path: "/auctions/:auction_uid", element: <Auction /> },
    ],
  };

  const allRoutes = [];
  Object.entries(NETWORKS).forEach(([version, networks]) => {
    networks.forEach((network) => {
      routes[version].forEach((route) => {
        let v = "";
        if (version !== "v1") {
          v = `${version}/`;
        }
        const url = `${v}${network.key}${route.path}`;
        allRoutes.push(<Route key={url} path={url} element={route.element} />);
      });
    });
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SimpleRedirect replace to="/ethereum" />} />
        {allRoutes.map((route) => route)}

        {/* Catch all */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default AjnaRoutes;
